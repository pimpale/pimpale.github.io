import ArticleLayout from '../components/ArticleLayout';
import Section from '../components/Section';

const AchernarUrl = '/achernar.html';
const GravityUrl = '/gravity.html';
const TerrainGeneration1Url = '/terraingeneration1.html';
const Fluid1Url = '/fluid1.html';


const Articles = () =>
  <Section id="articles" name="Articles">
    <ul>
      <li><a href={AchernarUrl}>Achernar</a></li>
      <li><a href={GravityUrl}>Gravity</a></li>
      <li><a href={TerrainGeneration1Url}>Terrain Generation 1</a></li>
      <li><a href={Fluid1Url}>Fluid Simulation 1</a></li>
    </ul>
  </Section>

export default Articles;
