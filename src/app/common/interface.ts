export interface Trip {
  origin: string;
  destination: string;
  originAbberivation: string;
  destinationAbberivation: string;
  showArrow: boolean;
  showLine: boolean;
  level: number;
  filled:boolean;
  abbrevation:string;
  showCurve:boolean;
  showCurveDown?:boolean;
}
