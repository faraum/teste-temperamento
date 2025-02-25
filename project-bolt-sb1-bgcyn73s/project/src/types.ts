export type Characteristic = {
  id: number;
  text: string;
  temperament: 'choleric' | 'sanguine' | 'melancholic' | 'phlegmatic';
};

export type TemperamentResult = {
  choleric: number;
  sanguine: number;
  melancholic: number;
  phlegmatic: number;
};