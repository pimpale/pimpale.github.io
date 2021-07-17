import Layout from '../components/Layout';
import Section from '../components/Section';

import MugAndTorus from "../assets/Mug_and_Torus_morph.gif";

type AsideCardProps = {
  title: string,
}

const AsideCard: React.FunctionComponent<AsideCardProps> = props =>
  <div className="card mx-5">
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
        <h4 >Rationale</h4>
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
            <img src={MugAndTorus} className="border border-dark mx-auto d-block" alt="A mug morphing into a torus and back" />
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
          Spherical worlds are more realistic, and if creating an accurate simulation is important, is the way to go.
          Spherical geometry is also required if you want to be able to render the planet's surface from space.
        </p>
        <p>
          However, spherical geometry is incompatible with voxel tiling over the surface.
          If we tile over the surface of a sphere with squares, we will end up with at least a few <strong>singularities</strong>.
        </p>
        <AsideCard title="Singularities">
          <strong>Singularity</strong>: A point in space where
        </AsideCard>
        <p>
          This is because there is no way to project a
        </p>

        <p>
          Ideally, we would like our world to be flat, so we can use Euclidean geometry.
          The farther we depart from flat, the more complex math we need to do.
        </p>

      </Section>
      <Section id="terrainGeneration" name="Terrain Generation">

      </Section>
    </div>
  </Layout >


export default TerrainGeneration;
