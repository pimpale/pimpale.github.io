import ArticleLayout from '../components/ArticleLayout';
import Section from '../components/Section';

import { format } from 'date-fns';

import { Article, articleData } from '../components/ArticleData';

export const ArticleLink = ({ a }: { a: Article }) =>
  <a href={a.url} children={a.name} />

const Articles = () =>
  <Section id="articles" name="Articles">
    <ul>
      {Array.from(articleData.values()).filter(a => a.listed).sort((a, b) => b.published.getTime() - a.published.getTime()).map((a, i) =>
        <li key={i}>
          <b className="me-2"><ArticleLink a={a} /></b>
          {a.fiction ? <span className="badge rounded-pill text-bg-light me-2">Fiction</span> : null}
          {format(a.published, "(MMM d, y)")}
          {"   "}
          <ul>
            <li><div className="text-muted text-nowrap d-inline-block">
              {a.incipit ? a.incipit : null}
            </div>
            </li>
          </ul>
        </li>
      )}
    </ul>
  </Section>

export default Articles;
