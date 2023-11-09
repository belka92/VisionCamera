export type TCameraZoom ={
    id: number,
    minZoom: number,
    maxZoom: number
}

export const cameraZoom: TCameraZoom[] = [
  {id: 1, minZoom: 0.5, maxZoom: 0.999999},
  {id: 2, minZoom: 1, maxZoom: 1.999999},
  {id: 3, minZoom: 2, maxZoom: 10.99999},
];

