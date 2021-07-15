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
          <img src={MugAndTorus} className="border border-dark mx-auto d-block" />
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
            <li>If it's finite, what's at the edges?</li>
          </ul>
        </p>
        <p>
          We will answer each of these questions in turn.
        </p>
        <h4>3D or 2D?</h4>
        <p>
          The dimensionality of the game is a core gameplay aspect that usually is decided early on.
        </p>
        <p>
          The main 3 options are 2D sidescroller, 2D top down, and 3D:
        </p>
        <p>
          <ul>
            <li>
              <p>
                <strong>Sidescrollers: </strong>
                These games use terrain generation primarily in cave systems, dungeons, or other subterranean structures.
                The terrain generation algorithms will be very different than the other two options, and incompatible.
                As such, we'll disregard this game class in this post, but we will revisit it sometime in the future.
              </p>
            </li>
            <li>
              <p>
                <strong>2D top down (Roguelikes): </strong>
                Roguelike games have a long history of using procedural generation.
                These games can make use of terrain generation in order to choose which biomes should go where, and where rivers, mountains, and cities should be located.
                However, unlike 3D games, we will lose a lot of information as we convert the world.
              </p>
            </li>
            <li>
              <p>
                <strong>3D game: </strong>
                In this article, we'll choose a 3D game since it tends to be easier to adapt a 3d algorithm to a 2d world than the other way around.
              </p>
            </li>
          </ul>
        </p>
        <p>
          However, it's important to note: just because our game world is 3D doesn't mean we always need to use a 3D data structure when generating the world.
          We can save massive amounts of memory if we can guarantee our world is roughly 2D during the world gen process.
          This does have certain limitations (no floating islands), but it is generally applicable for most usecases.
        </p>

        <h6 className="mt-3"></h6>

        <h4 className="mt-3">Infinite or Finite?</h4>
        <h4 className="mt-3">Boundary Conditions?</h4>


      </Section>
      <Section id="terrainGeneration" name="Terrain Generation">

      </Section>
    </div>
  </Layout >


export default TerrainGeneration;
