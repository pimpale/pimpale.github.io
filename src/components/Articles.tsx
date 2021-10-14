import ArticleLayout from '../components/ArticleLayout';
import Section from '../components/Section';

const AchernarUrl = '/achernar.html';
const GravityUrl = '/gravity.html';
const TerrainGenerationUrl = '/terraingeneration.html';


const Articles = () =>
  <Section id="articles" name="Articles">
    <ul>
      <li><a href={AchernarUrl}>Achernar</a></li>
      <li><a href={GravityUrl}>Gravity</a></li>
      <li><a href={TerrainGenerationUrl}>Terrain Generation 1</a></li>
    </ul>
  </Section>

export default Articles;
