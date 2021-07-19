import Layout from '../components/Layout';
import Section from '../components/Section';
import { Async } from 'react-async';

import ImageDataDisplay from '../components/ImageDataDisplay';
import { loadImage } from '../math';
import { extend, boxBlur } from '../components/Convolve';

import MugAndTorusMorphUrl from "../assets/Mug_and_Torus_morph.gif";
import MugAndTorusFrameUrl from "../assets/Mug_and_Torus_frame.png";

// demos
import SingularityDemo from '../components/SingularityDemo';




type FootnoteProps = {
  index: number,
  source: string,
}
const Footnote: React.FunctionComponent<FootnoteProps> = props =>
  <a href={props.source} style={{ textDecoration: "none" }}>
    <sup>[{props.index}]</sup>
  </a>








type AsideCardProps = {
  title: string,
}

const AsideCard: React.FunctionComponent<AsideCardProps> = props =>
  <div className="card mx-5 mb-2">
    <div className="card-body">
      <h6 className="card-title text-decoration-underline">{props.title}</h6>
      <div className="card-text">{props.children}</div>
    </div>
  </div>


const TerrainGeneration = () =>
  <Layout>
    <div className="container mt-5">
      <Section id="overview" name="Overview">
        <h4>Goals</h4>
        <p>
          Our goal in this article will be to procedurally generate and simulate a small game world.
          There are hundreds of ways to do this, and as we go along, we'll explore some of the different strategies we could have chosen and their tradeoffs.
        </p>
        <h4>Rationale</h4>
        <p>
          Procedural generation is a versatile tactic in game programming.
          Games that utilize procedural generation can have much larger maps than those with handcrafted levels, since they can generate content on the fly.
          (Ex. <a href="https://en.wikipedia.org/wiki/Minecraft">Minecraft</a> and <a href="https://en.wikipedia.org/wiki/No_Man%27s_Sky">No Man's Sky</a>)
          However, a potential downside is that excessive use of procedural generation makes games feel predictable and repetitive.
          In order to mitigate this, some games increase the depth of the world by using more elaborate generation systems.
          Dwarf Fortress, for example, even <a href="https://dwarffortresswiki.org/index.php/DF2014:World_generation">simulates an entire virtual history</a>.
          In the following sections, we'll discuss some techniques that could be used to procedurally generate content for a hypothetical game.
        </p>
        <h4>Key Decisions</h4>
        <p>
          In summary, our key techniques are as follows:
        </p>
        <ul>
          <li>Finite (but large) world</li>
          <li>Square grid as fundamental data structure</li>
          <li>World level procedural generation done at worldgen time, chunk level procedural generation done at runtime.</li>
          <li>Donut world (Periodic Boundary Conditions)</li>
          <li>Detailed biome and weather simulations</li>
          <li>Hydraulic Erosion (Fjords and River Valleys)</li>
          <li>Simulating History</li>
        </ul>
      </Section>
      <Section id="topology" name="World Topology">
        <h4>Topology</h4>
        <p>
          Our first (and perhaps biggest) major choice is deciding on the world's <strong>topology</strong>.
        </p>
        <AsideCard title="Topology">
          Topology describes the fundamental geometric properties of an object, especially those properties that don't change as the object is stretched, squished, or otherwise distorted.
          For example, a coffee mug is topologically equivalent to a donut since the mug, like the donut, has one through hole.
          <div className="mx-auto text-center my-3">
            <img src={MugAndTorusMorphUrl} className="border border-dark mx-auto d-block" alt="A mug morphing into a torus and back" />
            <small>Image in the public domain. <a href="https://commons.wikimedia.org/wiki/File:Mug_and_Torus_morph.gif">Source</a></small>
          </div>
          If you're interested, <a href="https://en.wikipedia.org/wiki/Topology">you can read more about topology on Wikipedia</a>.
        </AsideCard>
        <p>
          For our purposes, however, we want to know how the world should be shaped:
        </p>
        <ul>
          <li>Is it 2D or or 3D?</li>
          <li>Infinite or finite?</li>
          <li>Flat or Sphere?</li>
          <li>Boundary Conditions?</li>
        </ul>
        <p>
          We will answer each of these questions in turn.
        </p>
        <h4>3D or 2D?</h4>
        <p>
          In this article, we'll choose a 3D game since it tends to be easier to adapt a 3d algorithm to a 2d world than the other way around.
          However, it's important to note: just because our game world is 3D doesn't mean we always need to use a 3D data structure when generating the world.
          If we guarantee that for each point on our world's surface, the elevation is a well defined number, then we can use a 2d graph or grid to represent the heightmap.
        </p>
        <p>
          Heightmaps won't work if our world isn't vertically simple.
          {/* TODO Provide example of vertically vs nonvertically simple */}
          For example, if we want our world to be primarily cave based, with no real "surface" to speak of, then a given (x, y) coordinate pair may have multiple surfaces at different z levels.
          The same problem would apply for a floating island map.
          A possible workaround would be to use a small number of discrete z levels, each of which uses its own seperate heightmap.
          This approach is less efficient compared to a single heightmap, but since each per unit heightmap is smaller, it may still be feasible.
        </p>
        <h4>Infinite or Finite?</h4>
        <p>
          If we don't have any complex build time systems, then we can make our world size effectively infinite, and just generate everything at runtime.
          This is the approach Minecraft takes.
          In some ways, this is optimal:
          The user doesn't have to wait at all for world generation, and we have a lot of flexibility with how large the map should be.
        </p>
        <p>
          However, an infinite world bars us from doing deeper simulations that require knowledge of the game map ahead of time.
          We can't generate realistic rivers, glaciers, or historical simulations in such a world.
          For this reason, we'll choose a finite, but reasonably large, size.
        </p>
        <h4>Flat or Sphere?</h4>
        <p>
          Spherical worlds are more realistic, so if creating an accurate simulation is important, spheres are the way to go.
          Spherical geometry is also required if you want to be able to render the planet's surface from space.
        </p>
        <p>
          However, spherical geometry is incompatible with voxel tiling over the surface.
          If we tile over the surface of a sphere with a square grid, we will end up with at least a few <strong>singularities</strong>.
        </p>
        <AsideCard title="Singularities">
          <p>
            The most common use of the word <strong>singularity</strong> is in reference to the center of a black hole, where gravity is infinitely strong.
            However, a singularity can refer to any point where a mathematical function is undefined or has a undefined derivative.
          </p>
          <SingularityDemo className="mx-auto" style={{ width: "20em" }} />
          <p>
            The demo above shows a simple way to tile a sphere using squares.
            In the context of using a square grid to title over a sphere, singularties are points where our regular grid breaks down.
            Notice how each corner square tile will be missing one diagonal neighbor, resulting in angles near it being highly distorted.
            So in this case singularities appear at the corners of the cube.
          </p>
          <p>
            In general though, there is no way to tile a sphere using a regular square grid.
            There will always be tiles with less than the average number of neighboring tiles.
          </p>
        </AsideCard>
        <p>
          Since dealing with spheres is a needless hassle unless we have a specific use case, we're going to try to use a flat surface without curvature.
          This will enable us to use a grid when processing the data.
        </p>
        <h4>Boundary Conditions?</h4>
        <p>
          Now that we've settled on a flat finite surface, we have to decide what should go at the edges.
          However, we need to do more than just decide the content of the edge grid tiles.
          Many map operations need to access data from neighboring tiles.
          So, in order to process the edge tiles, we need to gather data from "beyond the edge".
        </p>
        <p>
          A <strong>boundary condition</strong> is a constraint on how we treat operations that go over the edges.
        </p>
        <p>
          We'll use a box blur in order to demonstrate the impacts of boundary conditions.
        </p>
        <AsideCard title="Blurring And Boundary Conditions">
          <Async promise={loadImage(MugAndTorusFrameUrl)}>
            <Async.Pending>
              <div className="spinner-border" role="status" />
            </Async.Pending>
            <Async.Fulfilled<ImageData>>{img => {
              const radius = 201;
              const fixedData = extend(img, "FIXED", radius)
              const mirrorData = extend(img, "MIRROR", radius)
              const periodicData = extend(img, "PERIODIC", radius)

              const fixedBlur = boxBlur(fixedData, radius);
              const mirrorBlur = boxBlur(mirrorData, radius);
              const periodicBlur = boxBlur(periodicData, radius);

              return <div className="container">
                <ImageDataDisplay
                  style={{ width: "20em", height: "20em" }}
                  className="border border-dark mx-auto d-block"
                  data={img}
                />
                <div className="row">
                  <div className="col">
                    <strong>Fixed Boundary Condition</strong>
                    <p>After extension:</p>
                    <ImageDataDisplay
                      className="border border-dark"
                      style={{ width: "15em", height: "15em" }}
                      data={fixedData}
                    />
                    <p>Final Result:</p>
                    <ImageDataDisplay
                      className="border border-dark"
                      style={{ width: "15em", height: "15em" }}
                      data={fixedBlur}
                    />
                  </div>
                  <div className="col">
                    <strong>Mirrored Boundary Condition</strong>
                    <p>After extension:</p>
                    <ImageDataDisplay
                      className="border border-dark"
                      style={{ width: "15em", height: "15em" }}
                      data={mirrorData}
                    />
                    <p>Final Result:</p>
                    <ImageDataDisplay
                      className="border border-dark"
                      style={{ width: "15em", height: "15em" }}
                      data={mirrorBlur}
                    />
                  </div>
                  <div className="col">
                    <strong>Periodic Boundary Condition</strong>
                    <p>After extension:</p>
                    <ImageDataDisplay
                      className="border border-dark"
                      style={{ width: "15em", height: "15em" }}
                      data={periodicData}
                    />
                    <p>Final Result:</p>
                    <ImageDataDisplay
                      className="border border-dark"
                      style={{ width: "15em", height: "15em" }}
                      data={periodicBlur}
                    />
                  </div>
                </div>
              </div>
            }}
            </Async.Fulfilled>
          </Async>
        </AsideCard>

        <ul>
          <li>Fixed boundary condition</li>
          <li>Mirrored boundary condition</li>
        </ul>


      </Section>



      <Section id="terrainGeneration" name="Terrain Generation">

      </Section>
    </div>

  </Layout >


export default TerrainGeneration;
