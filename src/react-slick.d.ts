declare module 'react-slick' {
    import { Component } from 'react';
  
    export interface Settings {
      dots?: boolean;
      infinite?: boolean;
      speed?: number;
      slidesToShow?: number;
      slidesToScroll?: number;
      arrows?: boolean;
      autoplay?: boolean;
      autoplaySpeed?: number;
      responsive?: { breakpoint: number; settings: Settings }[];
    }
  
    export default class Slider extends Component<Settings> {}
  }
  