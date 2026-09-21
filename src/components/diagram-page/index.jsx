import { Suspense, lazy, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineArrowLeft, AiOutlineZoomIn } from 'react-icons/ai';
import { getInitialTheme } from '../../helpers/utils';
import '../../assets/index.css';
import '@excalidraw/excalidraw/index.css';

const Excalidraw = lazy(() =>
  import('@excalidraw/excalidraw').then((mod) => ({
    default: mod.Excalidraw,
  }))
);

const Message = ({ children }) => (
  <div className="flex items-center justify-center h-full text-base-content text-opacity-50">
    {children}
  </div>
);

const DiagramPage = ({ config }) => {
  const diagrams = config.excalidraws || [];
  const id = new URLSearchParams(window.location.search).get('d');
  const diagram = diagrams.find((item) => item.id === id);

  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [hintVisible, setHintVisible] = useState(true);
  const [canvasTheme, setCanvasTheme] = useState('light');

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      getInitialTheme(config.themeConfig)
    );

    // Every daisyUI theme declares its own color-scheme, so the canvas can
    // follow whichever theme the portfolio is currently set to.
    setCanvasTheme(
      getComputedStyle(document.documentElement).colorScheme === 'dark'
        ? 'dark'
        : 'light'
    );
  }, [config.themeConfig]);

  useEffect(() => {
    if (diagram) document.title = `${diagram.title} | Kisu Kim`;
  }, [diagram]);

  useEffect(() => {
    if (!data) return;

    const timer = setTimeout(() => setHintVisible(false), 2000);
    return () => clearTimeout(timer);
  }, [data]);

  useEffect(() => {
    if (!diagram) return;

    let cancelled = false;

    fetch(diagram.file)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load');
        return res.json();
      })
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      });

    return () => {
      cancelled = true;
    };
  }, [diagram]);

  return (
    <div className="h-screen flex flex-col bg-base-300">
      <div className="flex items-center gap-4 px-4 py-3 bg-base-100 shadow">
        <a
          href="/"
          className="btn btn-ghost btn-sm normal-case gap-2 opacity-70"
        >
          <AiOutlineArrowLeft className="w-4 h-4" />
          Back
        </a>
        <h1 className="font-semibold text-base-content opacity-80 truncate">
          {diagram ? diagram.title : 'Diagram not found'}
        </h1>
      </div>
      <div className="flex-1 min-h-0 relative">
        {!diagram ? (
          <Message>No diagram matches “{id}”.</Message>
        ) : error ? (
          <Message>Failed to load diagram.</Message>
        ) : !data ? (
          <Message>Loading diagram…</Message>
        ) : (
          <Suspense fallback={<Message>Loading viewer…</Message>}>
            <Excalidraw
              initialData={{
                elements: data.elements,
                // The saved theme is whatever Obsidian was in; let the prop win.
                appState: { ...data.appState, theme: undefined },
                files: data.files,
                scrollToContent: true,
              }}
              viewModeEnabled={true}
              zenModeEnabled={false}
              theme={canvasTheme}
            />
          </Suspense>
        )}
        <div
          className={`pointer-events-none absolute inset-0 z-50 flex items-center justify-center transition-opacity duration-1000 ${
            hintVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="flex items-center gap-2 px-5 py-3 rounded-full bg-neutral bg-opacity-80 text-neutral-content text-sm shadow-lg">
            <AiOutlineZoomIn className="w-5 h-5" />
            Scroll or pinch to zoom · drag to pan
          </span>
        </div>
      </div>
    </div>
  );
};

Message.propTypes = {
  children: PropTypes.node,
};

DiagramPage.propTypes = {
  config: PropTypes.object.isRequired,
};

export default DiagramPage;
