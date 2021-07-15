import Layout from '../components/Layout';
import Section from '../components/Section';

import MugAndTorus from "../assets/Mug_and_Torus_morph.gif";

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
          Our first (and perhaps biggest) major choice is deciding on the world's topology.
          Topology describes the fundamental geometric properties of an object, especially those properties that don't change as the object is stretched, squished, or otherwise distorted.
          The classic example is that one can technically get a coffee mug from a donut since the mug, like the donut, has one through hole.
        </p>
        <div className="mx-auto text-center my-3">
          <img src={MugAndTorus} className="border border-dark mx-auto d-block" alt="A mug morphing into a torus and back" />
          <small>Image in the public domain. <a href="https://commons.wikimedia.org/wiki/File:Mug_and_Torus_morph.gif">Source</a></small>
        </div>
        <p>
          If you're interested, <a href="https://en.wikipedia.org/wiki/Topology">you can read more about topology on Wikipedia</a>.
        </p>
        <p>
          For our purposes, however, we want to know how the world should be shaped:
          <ul>
            <li>Is it 2D or or 3D?</li>
            <li>Infinite or finite?</li>
            <li>Flat or Sphere?</li>
            <li>Boundary Conditions?</li>
          </ul>
        </p>
        <p>
          We will answer each of these questions in turn.
        </p>
        <h4>3D or 2D?</h4>
        <p>
          The dimensionality of the game is a core gameplay aspect that usually is decided early on.
          In this article, we'll choose a 3D game since it tends to be easier to adapt a 3d algorithm to a 2d world than the other way around.
        </p>
        <p>
          However, it's important to note: just because our game world is 3D doesn't mean we always need to use a 3D data structure when generating the world.
          If we guarantee that for each point on our world's surface, the elevation is a well defined number, then we can use a 2d graph or grid to represent the heightmap.
          This approach does have certain limitations, but it signficantly simplifies world generation and improves performance.
        </p>
        <p>
          There are situations where a heightmap is not desirable though.
          For example, if we want our world to be primarily cave based, with no real "surface" to speak of, then this approach is obviously untenable.
          It also doesn't work well if you want to have a world made of only floating islands, since there isn't really a standard way to define "elevation" for a given coordinate.
          In these situations, a possible workaround could be to generate each cavern or floating island independently.
          Then, for each unit, we can use a seperate heightmap.
          This approach is less efficient compared to a single heightmap, but since each per unit heightmap is smaller, it may still be feasible.
        </p>
        <p>
          If we don't want to use a heightmap, then the alternative is to use a fully 3D approach.
          This is what we'll end up doing during our runtime chunk generation, but we reccomend against using a 3D approach during the intial worldgen stage due to the massive memory requirements.
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
          Spherical geometry is also required if space travel is an aspect of gameplay.
        </p>
        <p>
          However, spherical geometry is incompatible with voxel tiling over the surface.
          There is no way to tile squares over the entire surface of a sphere without some points having

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
