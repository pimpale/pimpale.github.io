import ArticleLayout from '../components/ArticleLayout';
import Section from '../components/Section';

import { articleData } from '../components/ArticleData';

const Articles = () =>
  <Section id="articles" name="Articles">
    <ul>
      {Array.from(articleData.values()).map((a, i) =>
        <li key={i}><a href={a.url} children={a.name} /></li>
      )}
    </ul>
  </Section>

export default Articles;
