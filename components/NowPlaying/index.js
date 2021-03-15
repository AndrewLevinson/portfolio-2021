import { formatDistanceToNow } from 'date-fns';
import styles from './index.module.scss';
import useSWR from 'swr';
const fetcher = (...args) => fetch(...args).then(res => res.json());

function NowPlaying() {
  // const { data } = useSWR('/api/spotify-track', fetcher, { refreshInterval: 15000 });
  const { data } = useSWR('/api/spotify-track', fetcher);

  if (!data) {
    return (
      <div className={styles.playing}>
        <h5>Loading Spotify...</h5>
        <div className={styles.flex}>
          <div className={styles.albumPlaceholder} />
          <div className={styles.info}>
            <span>Title</span>
            <span>Artist</span>
            <div className={styles.genreList}>Genres</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.playing}>
      <h5>
        Currently listening
        {data.isPlaying ? (
          <span> ...right now (yes, literally right now)</span>
        ) : (
          <span> ...{formatDistanceToNow(new Date(data.playedAt), { addSuffix: true })}</span>
        )}
      </h5>

      <a href={data.songUrl} target='_blank' rel='noopener noreferrer'>
        <div className={styles.flex}>
          <img
            src={data.albumImageUrl}
            alt={`album image for ${data.album} by ${data.artist}`}
            width={70}
            height={70}
          />
          <div className={styles.info}>
            <span>{data.title}</span>
            <span>{data.artist}</span>
            <div className={styles.genreList}>
              {data.genreList
                .slice(0, 3)
                .map(genre => genre)
                .join(', ')
                .replace(/, ([^,]*)$/, ', and $1')}
            </div>
          </div>
        </div>
        <p className={styles.time}>
          <span className={styles.icon}>
            <svg viewBox='0 0 567 171'>
              <title>Spotify_Logo_RGB_Green</title>
              <g stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
                <path d='M137.532,76.477 C110.538,60.446 66.012,58.972 40.243,66.793 C36.105,68.048 31.729,65.712 30.475,61.574 C29.221,57.434 31.555,53.061 35.696,51.803 C65.277,42.824 114.451,44.558 145.527,63.005 C149.25,65.215 150.471,70.022 148.264,73.738 C146.056,77.46 141.245,78.687 137.532,76.477 Z M136.648,100.221 C134.755,103.294 130.737,104.257 127.668,102.371 C105.163,88.537 70.846,84.53 44.221,92.612 C40.768,93.655 37.121,91.708 36.073,88.262 C35.032,84.809 36.98,81.169 40.426,80.119 C70.842,70.89 108.652,75.36 134.5,91.245 C137.569,93.135 138.535,97.155 136.648,100.221 Z M126.401,123.024 C124.897,125.491 121.683,126.265 119.225,124.761 C99.559,112.742 74.807,110.027 45.657,116.686 C42.848,117.33 40.049,115.569 39.408,112.761 C38.764,109.952 40.518,107.153 43.333,106.512 C75.233,99.219 102.597,102.358 124.67,115.846 C127.131,117.349 127.906,120.564 126.401,123.024 Z M87.996,2.237 C41.746,2.237 4.252,39.729 4.252,85.979 C4.252,132.232 41.746,169.723 87.996,169.723 C134.247,169.723 171.739,132.232 171.739,85.979 C171.739,39.729 134.247,2.237 87.996,2.237 L87.996,2.237 Z'></path>
                <path d='M232.089,79.546 C217.63,76.098 215.055,73.678 215.055,68.594 C215.055,63.789 219.579,60.557 226.305,60.557 C232.825,60.557 239.289,63.012 246.068,68.066 C246.273,68.219 246.53,68.28 246.783,68.24 C247.036,68.202 247.259,68.064 247.408,67.854 L254.468,57.902 C254.758,57.492 254.679,56.928 254.288,56.614 C246.221,50.141 237.137,46.994 226.519,46.994 C210.907,46.994 200.002,56.363 200.002,69.768 C200.002,84.143 209.409,89.233 225.665,93.162 C239.501,96.349 241.836,99.018 241.836,103.792 C241.836,109.081 237.114,112.369 229.515,112.369 C221.076,112.369 214.191,109.526 206.49,102.857 C206.299,102.693 206.037,102.617 205.795,102.631 C205.541,102.652 205.308,102.77 205.146,102.965 L197.23,112.386 C196.898,112.777 196.94,113.361 197.323,113.699 C206.284,121.698 217.303,125.924 229.195,125.924 C246.018,125.924 256.889,116.731 256.889,102.504 C256.889,90.48 249.705,83.83 232.089,79.546'></path>
                <path d='M307.162,95.661 C307.162,105.814 300.908,112.899 291.953,112.899 C283.1,112.899 276.422,105.492 276.422,95.661 C276.422,85.831 283.1,78.423 291.953,78.423 C300.764,78.423 307.162,85.671 307.162,95.661 Z M294.95,65.286 C287.658,65.286 281.677,68.158 276.745,74.043 L276.745,67.419 C276.745,66.896 276.321,66.47 275.798,66.47 L262.852,66.47 C262.329,66.47 261.906,66.896 261.906,67.419 L261.906,141.021 C261.906,141.544 262.329,141.97 262.852,141.97 L275.798,141.97 C276.321,141.97 276.745,141.544 276.745,141.021 L276.745,117.789 C281.678,123.325 287.66,126.029 294.95,126.029 C308.499,126.029 322.215,115.599 322.215,95.661 C322.215,75.719 308.499,65.286 294.95,65.286 L294.95,65.286 Z'></path>
                <path d='M357.373,113.005 C348.092,113.005 341.095,105.548 341.095,95.661 C341.095,85.733 347.85,78.527 357.159,78.527 C366.5,78.527 373.544,85.984 373.544,95.878 C373.544,105.805 366.743,113.005 357.373,113.005 Z M357.373,65.286 C339.924,65.286 326.254,78.722 326.254,95.878 C326.254,112.847 339.83,126.142 357.159,126.142 C374.67,126.142 388.382,112.751 388.382,95.661 C388.382,78.628 374.764,65.286 357.373,65.286 L357.373,65.286 Z'></path>
                <path d='M425.644,66.47 L411.397,66.47 L411.397,51.904 C411.397,51.381 410.975,50.956 410.452,50.956 L397.507,50.956 C396.983,50.956 396.557,51.381 396.557,51.904 L396.557,66.47 L390.332,66.47 C389.81,66.47 389.389,66.896 389.389,67.419 L389.389,78.546 C389.389,79.068 389.81,79.494 390.332,79.494 L396.557,79.494 L396.557,108.286 C396.557,119.921 402.348,125.82 413.769,125.82 C418.413,125.82 422.266,124.861 425.897,122.802 C426.192,122.637 426.376,122.319 426.376,121.981 L426.376,111.385 C426.376,111.058 426.205,110.75 425.926,110.578 C425.644,110.401 425.293,110.392 425.004,110.535 C422.51,111.79 420.099,112.369 417.404,112.369 C413.251,112.369 411.397,110.484 411.397,106.257 L411.397,79.494 L425.644,79.494 C426.167,79.494 426.588,79.068 426.588,78.546 L426.588,67.419 C426.588,66.896 426.167,66.47 425.644,66.47'></path>
                <path d='M475.281,66.527 L475.281,64.738 C475.281,59.475 477.299,57.128 481.825,57.128 C484.524,57.128 486.692,57.664 489.12,58.474 C489.419,58.568 489.731,58.521 489.974,58.342 C490.224,58.163 490.365,57.876 490.365,57.572 L490.365,46.662 C490.365,46.246 490.097,45.876 489.696,45.753 C487.131,44.991 483.849,44.207 478.935,44.207 C466.976,44.207 460.656,50.941 460.656,63.674 L460.656,66.414 L454.436,66.414 C453.914,66.414 453.486,66.84 453.486,67.362 L453.486,78.546 C453.486,79.068 453.914,79.494 454.436,79.494 L460.656,79.494 L460.656,123.904 C460.656,124.427 461.078,124.852 461.6,124.852 L474.546,124.852 C475.069,124.852 475.495,124.427 475.495,123.904 L475.495,79.494 L487.583,79.494 L506.1,123.892 C503.998,128.557 501.931,129.485 499.109,129.485 C496.828,129.485 494.426,128.804 491.97,127.46 C491.739,127.333 491.466,127.312 491.216,127.389 C490.969,127.477 490.761,127.66 490.656,127.901 L486.268,137.528 C486.059,137.983 486.237,138.517 486.675,138.753 C491.256,141.234 495.392,142.293 500.502,142.293 C510.062,142.293 515.346,137.839 520.005,125.859 L542.466,67.819 C542.578,67.527 542.545,67.198 542.366,66.938 C542.188,66.682 541.901,66.527 541.587,66.527 L528.109,66.527 C527.706,66.527 527.344,66.783 527.212,67.163 L513.405,106.6 L498.282,67.137 C498.144,66.769 497.791,66.527 497.398,66.527 L475.281,66.527'></path>
                <path d='M446.505,66.47 L433.558,66.47 C433.035,66.47 432.61,66.896 432.61,67.419 L432.61,123.904 C432.61,124.427 433.035,124.852 433.558,124.852 L446.505,124.852 C447.027,124.852 447.453,124.427 447.453,123.904 L447.453,67.419 C447.453,66.896 447.027,66.47 446.505,66.47'></path>
                <path d='M440.097,40.751 C434.969,40.751 430.806,44.904 430.806,50.033 C430.806,55.164 434.969,59.321 440.097,59.321 C445.224,59.321 449.382,55.164 449.382,50.033 C449.382,44.904 445.224,40.751 440.097,40.751'></path>
                <path d='M554.049,72.089 L551.677,72.089 L551.677,75.114 L554.049,75.114 C555.233,75.114 555.94,74.535 555.94,73.6 C555.94,72.616 555.233,72.089 554.049,72.089 Z M555.587,76.404 L558.164,80.012 L555.991,80.012 L553.671,76.703 L551.677,76.703 L551.677,80.012 L549.858,80.012 L549.858,70.449 L554.123,70.449 C556.344,70.449 557.806,71.585 557.806,73.499 C557.806,75.067 556.9,76.025 555.587,76.404 Z M553.567,67.266 C548.9,67.266 545.368,70.976 545.368,75.519 C545.368,80.059 548.875,83.72 553.519,83.72 C558.185,83.72 561.72,80.012 561.72,75.467 C561.72,70.926 558.211,67.266 553.567,67.266 Z M553.519,84.631 C548.395,84.631 544.408,80.516 544.408,75.519 C544.408,70.521 548.447,66.36 553.567,66.36 C558.69,66.36 562.678,70.474 562.678,75.467 C562.678,80.464 558.642,84.631 553.519,84.631 L553.519,84.631 Z'></path>
              </g>
            </svg>
          </span>
        </p>
      </a>
    </div>
  );
}

export default NowPlaying;
