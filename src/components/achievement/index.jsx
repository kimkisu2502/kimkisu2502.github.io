import { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { skeleton } from '../../helpers/utils';
import { AiFillStar } from 'react-icons/ai';

const RepoStar = ({ repo }) => {
  const [stars, setStars] = useState(null);

  useEffect(() => {
    if (!repo) return;

    axios
      .get(`https://api.github.com/repos/${repo}`)
      .then((res) => setStars(res.data.stargazers_count))
      .catch(() => {});
  }, [repo]);

  if (stars === null) return null;

  return (
    <span className="inline-flex items-center gap-0.5 ml-2 text-xs opacity-60 align-middle">
      <AiFillStar className="inline-block" />
      {stars}
    </span>
  );
};

const ListItem = ({ title, authors, venue, links, repo }) => (
  <li className="mb-5 ml-4">
    <div
      className="absolute w-2 h-2 bg-base-300 rounded-full border border-base-300 mt-1.5"
      style={{ left: '-4.5px' }}
    ></div>
    <div className="font-semibold">
      {title}
      {repo && <RepoStar repo={repo} />}
      {links
        ?.filter((l) => l.url)
        .map((l, i) => (
          <a
            key={i}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            className="ml-2 text-sm font-normal link link-hover opacity-60"
          >
            [{l.label}]
          </a>
        ))}
    </div>
    <p className="text-base-content text-opacity-60 text-sm">{authors}</p>
    <p className="mb-4 text-base-content text-opacity-60 text-sm italic">
      {venue}
    </p>
  </li>
);

const displaySection = (achievements) => {
  if (achievements && Array.isArray(achievements) && achievements.length) {
    return true;
  } else {
    return false;
  }
};

const Achievement = ({ achievements, loading }) => {
  const renderSkeleton = () => {
    let array = [];
    for (let index = 0; index < 2; index++) {
      array.push(
        <ListItem
          key={index}
          title={skeleton({
            width: 'w-8/12',
            height: 'h-4',
            className: 'my-1.5',
          })}
          authors={skeleton({ width: 'w-6/12', height: 'h-3' })}
          venue={skeleton({ width: 'w-4/12', height: 'h-3' })}
        />
      );
    }

    return array;
  };

  return (
    <Fragment>
      {displaySection(achievements) && (
        <div className="col-span-1 lg:col-span-2">
          <div className="card compact bg-base-100 shadow bg-opacity-40">
            <div className="card-body">
              <div className="mx-3 flex items-center justify-between mb-2">
                <h5 className="card-title">
                  {loading ? (
                    skeleton({ width: 'w-40', height: 'h-8' })
                  ) : (
                    <span className="text-base-content opacity-70">
                      Publications & Patents
                    </span>
                  )}
                </h5>
              </div>
              <div className="text-base-content text-opacity-60">
                <ol className="relative border-l border-base-300 border-opacity-30 my-2 mx-4">
                  {loading
                    ? renderSkeleton()
                    : achievements.map((item, index) => (
                        <ListItem
                          key={index}
                          title={item.title}
                          authors={item.authors}
                          venue={item.venue}
                          links={item.links}
                          repo={item.repo}
                        />
                      ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

RepoStar.propTypes = {
  repo: PropTypes.string,
};

ListItem.propTypes = {
  title: PropTypes.node,
  authors: PropTypes.node,
  venue: PropTypes.node,
  links: PropTypes.array,
  repo: PropTypes.string,
};

Achievement.propTypes = {
  achievements: PropTypes.array,
  loading: PropTypes.bool.isRequired,
};

export default Achievement;
