export type FileLink = {
  label: string;
  url: string;
  fileType?: string;
  note?: string;
};

export type Subsection = {
  id: string;
  title: string;
  description: string;
  steps: string[];
  tips?: string[];
  warning?: string;
  links: FileLink[];
};

export type Category = {
  id: string;
  title: string;
  description: string;
  brandId?: string;
  brandIds?: string[];
  overview?: string[];
  subsections: Subsection[];
};

export type HubContent = {
  flashovanieCategories: Category[];
  diagnostikaCategories: Category[];
  nastrojeCategories: Category[];
  zdielanieSubsections: Subsection[];
};