export default function Loader() {
    return(
        <div className="loader_parent">
            <svg  width="200" height="200" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <rect x="15" y="30" width="10" height="40" fill="#1d3f72">
                <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin="-0.6"></animate>
                </rect><rect x="35" y="30" width="10" height="40" fill="#5699d2">
                <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin="-0.4"></animate>
                </rect><rect x="55" y="30" width="10" height="40" fill="#d8ebf9">
                <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin="-0.2"></animate>
                </rect><rect x="75" y="30" width="10" height="40" fill="#71c2cc">
                <animate attributeName="opacity" dur="1s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.5 0 0.5 1;0.5 0 0.5 1" values="1;0.2;1" begin="-1"></animate>
                </rect>
                </svg>
        </div>
    )
}