import React from 'react';

import Section from '../components/Section';
import HrefLink from '../components/HrefLink';
import ArticleLayout from '../components/ArticleLayout';

import AsideCard from '../components/AsideCard';

import MinecraftClassicExample from "../assets/whyvoxels/MinecraftClassic.png";
import VelorenExample from "../assets/whyvoxels/veloren.png";
import CS174AProjectExample from "../assets/whyvoxels/cs174a_project_screenshot1.png";

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
            <img alt="Minecraft Classic" className="d-block mx-auto" style={{ width: "20em" }} src={MinecraftClassicExample} />
            <figcaption>Source: <a href="https://www.minecraft.net/fr-ca/article/embrace-past-minecraft-classic">Minecraft</a></figcaption>
          </figure>
          <figure className="col text-center">
            <img alt="Example of region" className="d-block mx-auto" style={{ width: "20em" }} src={VelorenExample} />
            <figcaption>Source: <a href="https://book.veloren.net/">Veloren</a></figcaption>
          </figure>
          <figure className="col text-center">
            <img alt="Example of a non region" className="d-block mx-auto" style={{ width: "20em" }} src={CS174AProjectExample} />
            <figcaption>Source: <a href="../projects.html#browser-voxel-game">Own Work</a></figcaption>
          </figure>
        </div>
      </AsideCard>
      <p>
        People often call games in this category "Voxel Games", since the word <b>voxel</b> is short for "<b>vo</b>lume <b>el</b>ement".
        A <a href="https://en.wikipedia.org/wiki/Voxel#Computer_games">full list</a> is available on Wikipedia.
        You'll notice that all of these games make use of a three dimensional grid of cubes.
        However, in 2D games, there's a lot more variation.
        While many games use square grids, a lot of them use hexagonal grids.
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
      <p>
        Why don't we have anything like this for 3D games?
      </p>
      <h4>Math of grids</h4>
      <p>
        What we've been calling "grids" so far are called "tessellations" in mathematics.
      </p>
      <AsideCard title="Tessellation">
        <p>
          In math a <b>tessellation</b> is an arrangement of geometric shapes such that they fill the entire surface without any gaps or overlaps.
        </p>
        It's important to note that tessellations are a broad category. For instance:
        <ul>
          <li>The surface does not have to be Euclidean, we can tessellate over the surface of a sphere</li>
          <li>We don't have to use polygons to tessellate, we can use curvy shapes.</li>
          <li>We don't have to repeat our pattern, we can mamke a tessellation which is not periodic</li>
          <li>
            Tessellations can be in more than 2 dimensions, the cubic grid is also an example of a tessellation
            <ul>
              <li>A tessellation in more than 2 dimensions is sometimes called a <b>honeycomb</b></li>
            </ul>
          </li>
        </ul>
        <p>Examples:</p>
        <div className="row my-3">
          <figure className="col text-center">
            <img alt="Minecraft Classic" className="d-block mx-auto" style={{ width: "20em" }} src={MinecraftClassicExample} />
            <figcaption>Source: <a href="https://www.minecraft.net/fr-ca/article/embrace-past-minecraft-classic">Minecraft</a></figcaption>
          </figure>
          <figure className="col text-center">
            <img alt="Example of region" className="d-block mx-auto" style={{ width: "20em" }} src={VelorenExample} />
            <figcaption>Source: <a href="https://book.veloren.net/">Veloren</a></figcaption>
          </figure>
          <figure className="col text-center">
            <img alt="Example of a non region" className="d-block mx-auto" style={{ width: "20em" }} src={CS174AProjectExample} />
            <figcaption>Source: <a href="../projects.html#browser-voxel-game">Own Work</a></figcaption>
          </figure>
        </div>
      </AsideCard>
      <p>
      </p>
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
