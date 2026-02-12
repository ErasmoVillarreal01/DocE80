import Link from '@docusaurus/Link';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Documentation',
    url: '/docs/intro', // external
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Information which helps to customize systems, processes, based on experiences.
      </>
    ),
  },
  {
    title: 'Queries',
    url: 'queries/intro', // external
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Quick access to useful SQL queries for building, retrieving, and managing data.
      </>
    ),
  },
  {
    title: 'Official E80 User Guides',
    url: 'https://userguide.elettric80.it/', // external
    external: true,
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
       Official E80 user guides and documentation for operating, configuring, and maintaining systems.

      </>
    ),
  },
];

function Feature({ Svg, title, description, url, external }) {
  return (
    <div className={clsx('col col--4')}>
      <Link
        className={clsx('card', styles.featureCard)}
        to={url}
        
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        aria-label={title}

      >
        <div className="card__body">
          <div className="text--center">
            <Svg className={styles.featureSvg} role="img" />
          </div>
          <div className="text--center padding-horiz--md">
            <Heading as="h3">{title}</Heading>
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={props.title ?? idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
``