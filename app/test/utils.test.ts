import { filterComments } from "../utils";
import type { IFeedbackItem } from "../../shared/types";

const comments: IFeedbackItem[] = [
  {
    id: 0,
    product_id: 1,
    timestamp: "2022-02-14T06:53:26.555Z",
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
  {
    id: 2,
    product_id: 1,
    timestamp: "2022-02-15T14:35:26.555Z",
    name: "Deegan Villarreal",
    rating: 4,
    comment:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nesciunt eaque cumque vero cum facere aperiam tempore animi illum ad iure dolorem, itaque eum ducimus eos, voluptates aspernatur deserunt doloribus non alias maxime temporibus mollitia voluptatibus!",
    helpful: 13,
  },
];

describe("filterComments", () => {
  it("should filter by id and sort with the latest date first", () => {
    const result = filterComments(comments, 1);

    expect(result.length).toBe(2);
    expect(result[0].id).toBe(2);
    expect(result[1].id).toBe(0);
  });
});
