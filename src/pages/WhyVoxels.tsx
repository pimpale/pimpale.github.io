import React from 'react';

import Section from '../components/Section';
import HrefLink from '../components/HrefLink';
import ArticleLayout from '../components/ArticleLayout';

import AsideCard from '../components/AsideCard';

import MinecraftClassicExample from "../assets/whyvoxels/MinecraftClassic.png";
import VelorenExample from "../assets/whyvoxels/veloren.png";
import CS174AProjectExample from "../assets/whyvoxels/cs174a_project_screenshot1.png";

import ChiralPentagonExample from "../assets/whyvoxels/P5-type15-chiral_coloring.png";
import H2TilingExample from "../assets/whyvoxels/600px-H2_tiling_237-5.png";
import CubicHoneycombExample from "../assets/whyvoxels/Cubic_honeycomb.png";


const WhyVoxelsPage = () => <ArticleLayout>{
  ({ Citation, CitationBank }) => <>
    <Section name="Why are all voxels cubes?" id="why_voxels">
      <p>
        If you've ever played Minecraft, you'll notice that the world is (mostly) made up of cubes.
        It's not just Minecraft: basically every other fully destructible game (at the time of writing)
        uses cubes as the basic building block of their world.
      </p>
      <AsideCard title="Voxel Game Examples">
        <div className="row my-3">
          <figure className="col text-center">
            <img alt="screenshot from Minecraft Classic" className="d-block mx-auto" style={{ width: "20em" }} src={MinecraftClassicExample} />
            <figcaption>Source: <a href="https://www.minecraft.net/fr-ca/article/embrace-past-minecraft-classic">Minecraft</a></figcaption>
          </figure>
          <figure className="col text-center">
            <img alt="screenshot from Veloren" className="d-block mx-auto" style={{ width: "20em" }} src={VelorenExample} />
            <figcaption>Source: <a href="https://book.veloren.net/">Veloren</a></figcaption>
          </figure>
          <figure className="col text-center">
            <img alt="screenshot from CS174AProject" className="d-block mx-auto" style={{ width: "20em" }} src={CS174AProjectExample} />
            <figcaption>Source: <a href="../projects.html#browser-voxel-game">Own Work</a></figcaption>
          </figure>
        </div>
      </AsideCard>
      <p>
        People often call games in this category "Voxel Games", since the word <b>voxel</b> is short for "<b>vo</b>lume <b>el</b>ement".
        A <a href="https://en.wikipedia.org/wiki/Voxel#Computer_games">full list</a> is available on Wikipedia.
        You'll notice that all of these games make use of a three dimensional grid of cubes.
      </p>
      <p>
        However, in 2D games, there's a lot more variation.
        While many games use square grids, a lot of them use hexagonal grids, and even triangular ones.
      </p>
      Some notable examples of games on hex grids include:
      <ul>
        <li>
          Catan
          <Citation source="https://en.wikipedia.org/wiki/Catan" />
        </li>
        <li>
          Civilization 5
          <Citation source="https://en.wikipedia.org/wiki/Civilization_V" />
        </li>
        <li>
          Civilization 6
          <Citation source="https://en.wikipedia.org/wiki/Civilization_VI" />
        </li>
        <li>
          Heroes of Might and Magic 3
          <Citation source="https://en.wikipedia.org/wiki/Heroes_of_Might_and_Magic_III" />
        </li>
      </ul>
      Games on a triangular grid are rarer, but they exist as well:
      <ul>
        <li>
          Colossal Citadels
          <Citation source="http://cartographer.cc/posts/triangular-grid/" />
        </li>
        <li>
          Blokus Trigon
          <Citation source="https://boardgamegeek.com/image/761381/blokus-trigon" />
        </li>
      </ul>
      <p className="text-center">
        <b>Why don't we have anything like this for 3D games?</b>
      </p>
      <h4>Math of grids</h4>
      <p>
        What we've been calling "grids" so far are instances of tessellations in mathematics.
      </p>
      <AsideCard title="Tessellations">
        <p>
          In math a <b>tessellation</b> is an arrangement of geometric shapes such that they fill the entire surface without any gaps or overlaps.
        </p>
        It's important to note that tessellations are a broad category. For instance:
        <ul>
          <li>The surface does not have to be Euclidean, we can tessellate hyperbolic space.</li>
          <li>We don't have to use polygons to tessellate, we can use curvy shapes.</li>
          <li>We don't have to repeat our pattern, we can mamke a tessellation which is not periodic.</li>
          <li>
            Tessellations can be in more than 2 dimensions, the cubic grid (also sometimes called the <b>cubic honeycomb</b>) is also an example of a tessellation.
            <ul>
              <li>
                In general, any tessellation made of polyhedra in more than 2 dimensions is often called a <b>honeycomb</b>.
              </li>
            </ul>
          </li>
        </ul>
        <p>
          Examples of tessellations:
        </p>
        <div className="row my-3">
          <figure className="col text-center">
            <img alt="" className="d-block mx-auto" style={{ width: "15em" }} src={ChiralPentagonExample} />
            <figcaption>Source: <a href="https://commons.wikimedia.org/wiki/File:P5-type15-chiral_coloring.png">Wikipedia</a></figcaption>
            <p>Pentagonal Tiling</p>
          </figure>
          <figure className="col text-center">
            <img alt="rhombitriheptagonal tiling" className="d-block mx-auto" style={{ width: "15em" }} src={H2TilingExample} />
            <figcaption>Source: <a href="https://commons.wikimedia.org/wiki/File:Rhombitriheptagonal_tiling.svg">Wikipedia</a></figcaption>
            <p>Rhombitriheptagonal tiling of the hyperbolic plane</p>
          </figure>
          <figure className="col text-center">
            <img alt="cubic honeycomb" className="d-block mx-auto" style={{ width: "15em" }} src={CubicHoneycombExample} />
            <figcaption>Source: <a href="https://commons.wikimedia.org/wiki/File:Cubic_honeycomb.png">Wikipedia</a></figcaption>
            <p>Cubic Honeycomb</p>
          </figure>
        </div>
      </AsideCard>
      Since "tessellation" is an incredibly broad category, we need to assert some properties that will help us narrow down to the most useful and easy to use subset.
      <ul>
        <li>
          We only care about tessellations in Euclidean space.
          <ul>
            <li>
              Euclidean space is what we're used to using in the real world.
            </li>
            <li>
              It's also a lot easier to code than any other space (hyperbolic, spherical, etc.)
            </li>
          </ul>
        </li>
        <li>
          We want to use only one type of <b>regular polygon</b> to tessellate space.
          Regular polygons are polygons like the equilateral triangle and the square, where all angles and sides have the same length.
          <ul>
            <li>Tessellations of regular polygons are periodic, which makes it easier to code for, since we can make assumptions about things like how many neighbors a block has.</li>
            <li>Tessellations of regular polygons are symmetric, which, in addition to making coding easier, makes the world look more aesthetically pleasing.</li>
          </ul>
        </li>
      </ul>
      <p>
        The category of tessellations that satisfy these conditions are called <b>regular tessellations</b>.
        The hex, triangle, and square grids all are examples of 2D regular tessellations.
        The cubic honeycomb is an example of a 3D regular tessellation.
      </p>
      <h4>Regular Tessellations in N dimensions</h4>
      <p>
        Now we get to the basic reason why video games only use the cubic honeycomb: <b>There simply aren't any other options.</b>
      </p>
      <AsideCard title="Regular Tessellations by Dimension" >
        Here's a list of regular tessellations by dimension.
        <Citation source="https://en.wikipedia.org/wiki/Category:Regular_tessellations" />
        <ul>
          <li>
            2D
            <ul>
              <li>Square tiling</li>
              <li>Triangular tiling</li>
              <li>Hexagonal tiling</li>
            </ul>
          </li>
          <li>
            3D
            <ul>
              <li>Cubic honeycomb</li>
            </ul>
          </li>
          <li>
            4D
            <ul>
              <li>4-cubic (Tesseractic) honeycomb</li>
              <li>16-cell honeycomb</li>
              <li>24-cell honeycomb</li>
            </ul>
          </li>
          <li>
            5D
            <ul>
              <li>5-cubic honeycomb</li>
            </ul>
          </li>
          <li>
            6D
            <ul>
              <li>6-cubic honeycomb</li>
            </ul>
          </li>
          <li>
            7D
            <ul>
              <li>7-cubic honeycomb</li>
            </ul>
          </li>
          <li>
            8D
            <ul>
              <li>8-cubic honeycomb</li>
            </ul>
          </li>
        </ul>
      </AsideCard>
      <p>
        Inside 2 dimensions, we have our familiar square, triangular, and hexagonal tilings.
        But in 3 dimensions, we just have the cubic honeycomb.
        With the tight restrictions we specified earlier, it turns out there aren't any other options.
      </p>
      <p>
        Note that in 4D though, we have a similar situation as 2D.
        In addition to the cubic honeycomb, which appears in every dimension, we have two additional regular tessellations,
        the <a href="https://en.wikipedia.org/wiki/16-cell_honeycomb">16-cell honeycomb</a> and
        the <a href="https://en.wikipedia.org/wiki/24-cell_honeycomb">24-cell honeycomb</a>.
        These two honeycombs share another similarity with the 2D case, in that they are duals of each other.
        That means that if we replace the vertexes of one honeycomb with the
      </p>
      If we loosen the restrictions specified earlier to any convex polygon (even if not regular), we get the following:
      <ul>

      </ul>
    </Section>
    <Section id="sources" name="Sources">
      <CitationBank />
    </Section>
  </>
}</ArticleLayout>

import { createRoot } from 'react-dom/client';

// Bootstrap CSS & JS
import '../styles/style.scss';
import 'bootstrap/dist/js/bootstrap';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <WhyVoxelsPage />
  </React.StrictMode>,
);
