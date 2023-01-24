interface IPicture {
    id: number;
    url: string;
}

interface ILayer {
    index: number,
    type: "heading" | "subheading" | "text"
    content: string
  }