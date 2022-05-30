import ArticleLayout from '../components/ArticleLayout';
import Section from '../components/Section';

import { Article, articleData } from '../components/ArticleData';

export const ArticleLink = ({ a }: { a: Article }) =>
  <a href={a.url} children={a.name} />

const Articles = () =>
  <Section id="articles" name="Articles">
    <ul>
      {Array.from(articleData.values()).map((a, i) =>
        <li key={i}><ArticleLink a={a} /></li>
      )}
    </ul>
  </Section>

export default Articles;
