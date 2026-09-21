import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineNodeIndex } from 'react-icons/ai';
import { skeleton } from '../../helpers/utils';

const displaySection = (excalidraws) => {
  if (excalidraws && Array.isArray(excalidraws) && excalidraws.length) {
    return true;
  } else {
    return false;
  }
};

const ExcalidrawViewer = ({ excalidraws, loading }) => {
  const renderSkeleton = () =>
    [0, 1].map((index) => (
      <div className="card shadow-lg compact bg-base-100" key={index}>
        <div className="p-6">
          {skeleton({ width: 'w-6/12', height: 'h-5', className: 'mb-2' })}
          {skeleton({ width: 'w-10/12', height: 'h-4' })}
        </div>
      </div>
    ));

  const renderDiagrams = () =>
    excalidraws.map((item, index) => (
      <a
        key={index}
        href={`/diagram.html?d=${encodeURIComponent(item.id)}`}
        className="card shadow-lg compact bg-base-100 cursor-pointer"
      >
        <div className="p-6">
          <h2 className="font-semibold tracking-wide opacity-70 flex items-center gap-2">
            <AiOutlineNodeIndex className="w-5 h-5" />
            {item.title}
          </h2>
          {item.description && (
            <p className="mt-2 text-base-content text-opacity-60 text-sm">
              {item.description}
            </p>
          )}
        </div>
      </a>
    ));

  return (
    <Fragment>
      {displaySection(excalidraws) && (
        <div className="col-span-1 lg:col-span-2">
          <div className="card compact bg-base-100 shadow bg-opacity-40">
            <div className="card-body">
              <div className="mx-3 flex items-center justify-between mb-2">
                <h5 className="card-title">
                  {loading ? (
                    skeleton({ width: 'w-40', height: 'h-8' })
                  ) : (
                    <span className="text-base-content opacity-70">
                      Diagrams
                    </span>
                  )}
                </h5>
              </div>
              <div className="col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {loading ? renderSkeleton() : renderDiagrams()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

ExcalidrawViewer.propTypes = {
  excalidraws: PropTypes.array,
  loading: PropTypes.bool.isRequired,
};

export default ExcalidrawViewer;
