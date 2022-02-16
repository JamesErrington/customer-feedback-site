import type { FunctionComponent } from "react";
import { Menu, Header as SUIHeader } from "semantic-ui-react";

export const Header: FunctionComponent = () => {
  return (
    <Menu as="header" size="large">
      <Menu.Item className="header-title">
        <SUIHeader as="h2">Feedback</SUIHeader>
      </Menu.Item>
    </Menu>
  );
};
