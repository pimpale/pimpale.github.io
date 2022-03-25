import ArticleLayout from '../components/ArticleLayout';
import Section from '../components/Section';

import AchernarUrl from '../achernar.html?url';
import GravityUrl from '../gravity.html?url';
import TerrainGeneration1Url from '../terraingeneration1.html?url';
import TerrainGeneration2Url from '../terraingeneration2.html?url';
import Fluid1Url from '../fluid1.html?url';
import Fluid2Url from '../fluid2.html?url';

const Articles = () =>
  <Section id="articles" name="Articles">
    <ul>
      <li><a href={TerrainGeneration1Url}>Terrain Generation 1 - Donut World Topology</a></li>
      <li><a href={Fluid1Url}>Fluid Simulation 1 - Simple WebGL fluid simulation from scratch.</a></li>
      <li><a href={Fluid2Url}>Fluid Simulation 2 - Smoothed Particle Hydrodynamics</a></li>
      <li><a href={TerrainGeneration2Url}>Terrain Generation 2 - Donut World Weather 1</a></li>
      <li><a href={AchernarUrl}>Achernar</a></li>
      <li><a href={GravityUrl}>Gravity</a></li>
    </ul>
  </Section>

export default Articles;
