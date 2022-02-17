import MockDate from "mockdate";

import { handleProductRequest, handleCommentRequest, handleCommentPostRequest, handleChartRequest } from "../handlers";
import { readFile } from "../utils";
import { mockFile, mockRequest, mockResponse, restoreFile } from "./test-utils";
import type { IChartData, IFeedbackItem, IProductItem } from "../../shared/types";

const mockProducts: IProductItem[] = [
  {
    id: 1,
    name: "Product 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam recusandae cum perferendis iste architecto necessitatibus provident est. Nobis inventore hic veritatis dignissimos facere possimus porro, nulla quisquam necessitatibus.",
    price: "$100",
    rating: 4,
  },
  {
    id: 2,
    name: "Product 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere officiis quis provident dignissimos nisi maiores tempora beatae est ex repellendus reprehenderit cupiditate eveniet voluptatem placeat dolorem modi, laudantium in accusamus!",
    price: "$50",
    rating: 3,
  },
];

beforeAll(() => {
  console.error = jest.fn();
  MockDate.set("2022-01-01");
});

afterAll(() => {
  MockDate.reset();
});

describe("handleProductRequest", () => {
  beforeEach(() => {
    mockFile("products", JSON.stringify(mockProducts));
  });

  afterEach(() => {
    restoreFile();
  });

  it("should throw an error if a non-numeric id is supplied", async () => {
    const request = mockRequest({ id: "foo" });
    const { statusMock, sendMock, response } = mockResponse();
    await handleProductRequest(request, response);

    expect(statusMock).toBeCalledWith(500);
    expect(sendMock).toBeCalledWith("Failed to fetch data");
  });

  it("should throw an error if no product with the provided id is found", async () => {
    const request = mockRequest({ id: "0" });
    const { statusMock, sendMock, response } = mockResponse();
    await handleProductRequest(request, response);

    expect(statusMock).toBeCalledWith(500);
    expect(sendMock).toBeCalledWith("Failed to fetch data");
  });

  it("should returned the requested product", async () => {
    const request = mockRequest({ id: "1" });
    const { statusMock, sendMock, response } = mockResponse();
    await handleProductRequest(request, response);

    expect(statusMock).toBeCalledWith(200);
    expect(sendMock).toBeCalledWith(mockProducts[0]);
  });
});

const mockComments: IFeedbackItem[] = [
  {
    id: 0,
    product_id: 1,
    timestamp: "2022-02-15T14:35:26.555Z",
    name: "Raegan Dougherty",
    rating: 5,
    comment:
      "Sit enim laboris in adipisicing cillum commodo. Aute esse minim magna minim incididunt elit laborum sit sit nulla non mollit dolor.",
    helpful: 3,
  },
  {
    id: 1,
    product_id: 2,
    timestamp: "2022-02-14T11:21:26.555Z",
    name: "Laney Gilbert",
    rating: 4,
    comment: "Incididunt est ullamco sint laboris cillum sint nisi laboris nulla laborum occaecat.",
    helpful: 1,
  },
];

describe("handleCommentRequest", () => {
  beforeEach(() => {
    mockFile("comments", JSON.stringify(mockComments));
  });

  afterEach(() => {
    restoreFile();
  });

  it("should throw an error if a non-numeric id is supplied", async () => {
    const request = mockRequest({ id: "foo" });
    const { statusMock, sendMock, response } = mockResponse();
    await handleCommentRequest(request, response);

    expect(statusMock).toBeCalledWith(500);
    expect(sendMock).toBeCalledWith("Failed to fetch data");
  });

  it("should returned the comments for the requested product", async () => {
    const request = mockRequest({ id: "1" });
    const { statusMock, sendMock, response } = mockResponse();
    await handleCommentRequest(request, response);

    expect(statusMock).toBeCalledWith(200);
    expect(sendMock).toBeCalledWith([mockComments[0]]);
  });
});

describe("handleCommentPostRequest", () => {
  beforeEach(() => {
    mockFile("comments", JSON.stringify(mockComments));
  });

  afterEach(() => {
    restoreFile();
  });

  it("should add the new comment and return the list of filtered comments for the requested product", async () => {
    const comment = {
      id: 1,
      name: "Deegan Villarreal",
      rating: 4,
      comment:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt eaque cumque vero cum facere aperiam tempore animi illum ad iure dolorem, itaque eum ducimus eos, voluptates aspernatur deserunt doloribus non alias maxime temporibus mollitia voluptatibus!",
    };
    const request = mockRequest({ id: "1" }, { ...comment });
    const { statusMock, sendMock, response } = mockResponse();
    await handleCommentPostRequest(request, response);

    expect(statusMock).toBeCalledWith(200);
    expect(sendMock).toBeCalledWith([
      mockComments[0],
      {
        id: 2,
        product_id: 1,
        timestamp: "2022-01-01T00:00:00.000Z",
        name: "Deegan Villarreal",
        rating: 4,
        comment:
          "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt eaque cumque vero cum facere aperiam tempore animi illum ad iure dolorem, itaque eum ducimus eos, voluptates aspernatur deserunt doloribus non alias maxime temporibus mollitia voluptatibus!",
        helpful: 0,
      },
    ]);

    const commentsFile = await readFile("comments");
    expect(JSON.parse(commentsFile).length).toBe(3);
  });
});

const mockCharts: IChartData[] = [
  {
    id: 1,
    labels: ["08/02/2022", "09/02/2022", "10/02/2022", "11/02/2022", "12/02/2022", "13/02/2022", "14/02/2022"],
    data: [5, 4.8, 4.3, 4.6, 4.5, 4.5, 4.4],
  },
  {
    id: 2,
    labels: ["08/02/2022", "09/02/2022", "10/02/2022", "11/02/2022", "12/02/2022", "13/02/2022", "14/02/2022"],
    data: [2.4, 3, 3.1, 3.4, 3.3, 3.1, 3.1],
  },
  {
    id: 3,
    labels: ["08/02/2022", "09/02/2022", "10/02/2022", "11/02/2022", "12/02/2022", "13/02/2022", "14/02/2022"],
    data: [3, 2.3, 2, 1.9, 2.2, 2.3, 2.1],
  },
];

describe("handleChartRequest", () => {
  beforeEach(() => {
    mockFile("charts", JSON.stringify(mockCharts));
  });

  afterEach(() => {
    restoreFile();
  });

  it("should throw an error if a non-numeric id is supplied", async () => {
    const request = mockRequest({ id: "foo" });
    const { statusMock, sendMock, response } = mockResponse();
    await handleChartRequest(request, response);

    expect(statusMock).toBeCalledWith(500);
    expect(sendMock).toBeCalledWith("Failed to fetch data");
  });

  it("should throw an error if no chart with the provided id is found", async () => {
    const request = mockRequest({ id: "0" });
    const { statusMock, sendMock, response } = mockResponse();
    await handleChartRequest(request, response);

    expect(statusMock).toBeCalledWith(500);
    expect(sendMock).toBeCalledWith("Failed to fetch data");
  });

  it("should returned the requested chart", async () => {
    const request = mockRequest({ id: "1" });
    const { statusMock, sendMock, response } = mockResponse();
    await handleChartRequest(request, response);

    expect(statusMock).toBeCalledWith(200);
    expect(sendMock).toBeCalledWith(mockCharts[0]);
  });
});
