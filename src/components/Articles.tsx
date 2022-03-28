import ArticleLayout from '../components/ArticleLayout';
import Section from '../components/Section';

const AchernarUrl = '../achernar.html';
const GravityUrl = '../gravity.html';
const TerrainGeneration1Url = '../terraingeneration1.html';
const TerrainGeneration2Url = '../terraingeneration2.html';
const Fluid1Url = '../fluid1.html';
const Fluid2Url = '../fluid2.html';

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
