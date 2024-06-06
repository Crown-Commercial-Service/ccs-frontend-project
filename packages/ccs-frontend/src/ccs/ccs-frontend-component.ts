interface CCSFrontendComponent {
  init(): void;
}

declare const CCSFrontendComponent: {
  new ($element: JQuery<HTMLElement>): CCSFrontendComponent;
  moduleName: string;
}

export { CCSFrontendComponent }
