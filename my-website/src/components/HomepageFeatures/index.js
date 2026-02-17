import Link from '@docusaurus/Link';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Documentation',
    url: '/docs/intro', // external
    imgSrc: require('@site/static/img/documentation.png').default,
    description: (
      <>
        Information which helps to customize systems, processes, based on experiences.
      </>
    ),
  },
  {
    title: 'Queries',
    url: 'queries/intro', // external
    imgSrc: require('@site/static/img/queries.png').default,
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
    imgSrc: require('@site/static/img/eagle.png').default,
    description: (
      <>
       Official E80 user guides and documentation for operating, configuring, and maintaining systems.

      </>
    ),
  },
];

function Feature({ Svg, imgSrc, title, description, url, external }) {
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
            {Svg ? (
              typeof Svg === 'string' ? (
                <img src={Svg} className={styles.featureSvg} role="img" alt={title} />
              ) : (
                <Svg className={styles.featureSvg} role="img" />
              )
            ) : imgSrc ? (
              <img src={imgSrc} className={styles.featureSvg} role="img" alt={title} />
            ) : null}
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