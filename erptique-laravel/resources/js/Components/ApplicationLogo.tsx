import { SVGAttributes } from 'react';

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        // style={{
        //   enableBackground: "new 0 0 500 500",
        // }}
        viewBox="0 0 500 500"
        {...props}
      >
        <g className="svg">
          <path
            fill="none"
            d="M142.4 249.8c0 17.3 2.9 32.9 8.8 47 5.9 14.1 13.8 26.3 23.8 36.4 10 10.1 21.7 17.9 35.2 23.4 13.5 5.5 27.8 8.2 43 8.2s29.5-2.7 43-8.2c13.5-5.5 25.2-13.2 35.2-23.2 10-10 17.9-22.1 23.6-36.4s8.6-30.1 8.6-47.4c0-17.1-2.9-32.6-8.8-46.6S341 177 331 167s-21.7-17.7-35.2-23.2c-13.4-5.4-27.7-8.2-42.8-8.2v114.2H142.4z"
          />
          <path
            d="m376 42.4-5.2 32c-15.2-12.3-33.7-22.9-55.6-31.8-18.7-7.6-39.5-11.8-62.2-12.9v105.9c15.1 0 29.4 2.7 42.8 8.2C309.3 149.2 321 157 331 167c10 10 17.9 22 23.8 36 5.8 14 8.8 29.5 8.8 46.6 0 17.3-2.9 33.1-8.6 47.4s-13.6 26.4-23.6 36.4c-10 10-21.7 17.7-35.2 23.2-13.5 5.5-27.8 8.2-43 8.2s-29.6-2.7-43-8.2c-13.5-5.5-25.2-13.3-35.2-23.4-10-10.1-18-22.3-23.8-36.4-5.9-14.1-8.8-29.8-8.8-47H18.8c0 30.5 5.2 59.1 15.6 86 10.4 26.8 25.3 50.1 44.6 70s42.7 35.6 70.2 47.2c27.5 11.6 58.1 17.4 92 17.4 27.2 0 51.7-4.4 73.4-13.2 21.7-8.8 40.3-19.3 55.8-31.6l5.6 31.6h105.2V42.4H376z"
            className="svg_2"
          />
          <path d="M18.8 249.8H253V29.6z" className="svg_3" />
          <path
            d="M142.4 249.8H18.8l129.9 40c-4.1-12.3-6.3-25.6-6.3-40z"
            className="svg_1"
          />
        </g>
      </svg>
    );
}
