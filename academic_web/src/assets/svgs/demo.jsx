import * as React from "react"
export const Demo = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        width={20}
        height={20}
        {...props}
    >
        <path
            fill="#000"
            fillRule="evenodd"
            d="M20.05 17.65a3 3 0 0 0 1.2-2.4v-11a3 3 0 0 0-3-3h-12a3 3 0 0 0-3 3v11a3 3 0 0 0 1.2 2.4l6 4.5a3 3 0 0 0 3.6 0l6-4.5Z"
            clipRule="evenodd"
        />
    </svg>
)
