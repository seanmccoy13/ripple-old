import React, { lazy, Suspense } from "react";
import styled from "styled-components";
import { Link, Switch } from "react-router-dom";
import { Menu, Icon, Image, Button, Dropdown } from "semantic-ui-react";
import logo from "../../images/ripple/ripple-icon.png";
import LogoutButton from "../common/LogoutButton";
import { AdminAuthWrapper } from "./AdminAuthWrapper";
import {
  StyledHome,
  StyledAdminStage,
  StyledPagesNav
} from "./components/style";

import CompanySelection from "./components/companies/selection/CompanySelection";
import ConfirmationPage from "./components/new/ConfirmationPage";
import Loading from "../common/Loading";

const UserPage = lazy(() => import("./components/new/employees/UserPage"));
const ConfirmCompany = lazy(() =>
  import("./components/new/company/ConfirmCompany")
);
const OverDuePage = lazy(() => import("./components/overdue/OverduePage"));
const CompanyPage = lazy(() => import("./components/new/company/CompanyPage"));
const DashLogo = lazy(() => import("./components/DashLogo"));
const ParticipantSurvey = lazy(() =>
  import("./components/surveys/participant/ParticipantSurvey")
);
const ManagementSurvey = lazy(() =>
  import("./components/surveys/management/ManagementSurvey")
);
const AssignSurveysPage = lazy(() =>
  import("./components/assignsurveys/AssignSurveysPage")
);
const SchedulePage = lazy(() => import("./components/scheduler/SchedulePage"));
const AdminResults = lazy(() => import("./components/results/AdminResults"));
const UserManagementPage = lazy(() =>
  import("./components/employees/management/UserManagementPage")
);

const MenuPlus = styled.nav`
  width: 100%;
  @media print {
    display: none;
  }
`;

const BottomNav = ({ pathname }) => {
  const path = [
    "/admin-dashboard/newcompany",
    "/admin-dashboard/newcompany/company-confirm",
    "/admin-dashboard/users/add",
    "/admin-dashboard/surveys/ps",
    "/admin-dashboard/surveys/ms",
    "/admin-dashboard/assign/ps",
    "/admin-dashboard/assign/ms",
    "/admin-dashboard/newcompany/confirm"
  ];
  const index = path.indexOf(pathname);
  const previousPage = index > 0 ? path[index - 1] : path[0];
  const nextPage = index < path.length - 1 ? path[index + 1] : "";
  if (index < 0 || index === path.length - 1) {
    return <div />;
  }
  return (
    <StyledPagesNav>
      <div>
        <Button labelPosition="left" disabled={index === 0}>
          <Icon name="left chevron" />
          {(index > 0 || index === path.length - 1) && (
            <Link
              to={{
                pathname: previousPage
              }}
            >
              previous
            </Link>
          )}
        </Button>
      </div>
      <div>
        <Button disabled={index === path.length - 1} labelPosition="right">
          {index < path.length - 1 && (
            <Link to={{ pathname: nextPage }}>next</Link>
          )}
          <Icon name="right chevron" />
        </Button>
      </div>
    </StyledPagesNav>
  );
};
const DynamicMenu = ({ companyName, pathname }) => {
  if (pathname === "/admin-dashboard/newcompany") {
    return (
      <MenuPlus>
        <Menu stackable fluid>
          <Menu.Item color="black">
            <Link to="/admin-dashboard">
              <Image src={logo} avatar />
            </Link>
          </Menu.Item>
          <Menu.Item color="black">
            <Link to="/admin-dashboard">
              <Icon name="users" />
              Home
            </Link>
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item color="black">
              <LogoutButton />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </MenuPlus>
    );
  }
  if (!companyName) {
    return (
      <MenuPlus>
        <Menu stackable fluid>
          <Menu.Item color="black">
            <Link to="/admin-dashboard">
              <Image src={logo} avatar />
            </Link>
          </Menu.Item>
          <Menu.Item color="black">
            <Link to="/admin-dashboard/newcompany">
              <Icon name="plus" />
              Add New Company
            </Link>
          </Menu.Item>
          <Menu.Item color="black">
            <CompanySelection />
          </Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item color="black">
              <LogoutButton />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </MenuPlus>
    );
  }
  return (
    <MenuPlus>
      <Menu stackable fluid>
        <Menu.Item color="black">
          <Link to="/admin-dashboard">
            <Image src={logo} avatar />
          </Link>
        </Menu.Item>
        <Menu.Item
          color="black"
          active={
            pathname === "/admin-dashboard/newcompany" ||
            pathname === "/admin-dashboard/newcompany/company-confirm" ||
            pathname === "/admin-dashboard/newcompany/confirm"
          }
        >
          <Link to="/admin-dashboard/newcompany">
            <Icon name="plus" />
            Add New Company
          </Link>
        </Menu.Item>
        <Menu.Item color="black">
          <CompanySelection />
        </Menu.Item>
        <Menu.Item />
        <Menu.Item active={pathname === "/admin-dashboard/users/add"}>
          <Link to="/admin-dashboard/users/add">Add User</Link>
        </Menu.Item>
        <Menu.Item active={pathname === "/admin-dashboard/users/manage"}>
          <Link to="/admin-dashboard/users/manage">Manage Users</Link>
        </Menu.Item>
        <Menu.Item active={pathname.includes("/admin-dashboard/sms")}>
          <Dropdown item text="Reminders">
            <Dropdown.Menu>
              <Dropdown.Header>Send SMS</Dropdown.Header>
              <Dropdown.Item>
                <Link to="/admin-dashboard/users/sms/send">Send Reminder</Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/admin-dashboard/users/sms/schedule">
                  Schedule Reminders
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item active={pathname.includes("/admin-dashboard/surveys/")}>
          <Dropdown item text="Surveys">
            <Dropdown.Menu>
              <Dropdown.Header>Edit Surveys</Dropdown.Header>
              <Dropdown.Item>
                <Link to="/admin-dashboard/surveys/ps">
                  <Icon name="plus" />
                  Participant Survey
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/admin-dashboard/surveys/ms">
                  <Icon name="plus" />
                  Management Survey
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Item active={pathname.includes("/admin-dashboard/assign/")}>
          <Dropdown text="Assign">
            <Dropdown.Menu>
              <Dropdown.Header>Assign Surveys</Dropdown.Header>
              <Dropdown.Item>
                <Link to="/admin-dashboard/assign/ps">
                  <Icon name="plus" />
                  Participants
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/admin-dashboard/assign/ms">
                  <Icon name="plus" />
                  Managers
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>

        <Menu.Item active={pathname.includes("/admin-dashboard/results/")}>
          <Dropdown text="Results">
            <Dropdown.Menu>
              <Dropdown.Header>Check Results</Dropdown.Header>
              <Dropdown.Item>
                <Link to="/admin-dashboard/results/graph">
                  <Icon name="line graph" />
                  Graph
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link to="/admin-dashboard/results/dashboard">
                  <Icon name="address book outline" />
                  Dashboard
                </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item color="black" onClick={() => window.print()}>
            Print
          </Menu.Item>
          <Menu.Item color="black">
            <LogoutButton />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </MenuPlus>
  );
};
const AdminDashboard = ({
  company: { companyName },
  location: { pathname }
}) => {
  return (
    <Suspense fallback={<Loading />}>
      <StyledHome>
        <DynamicMenu companyName={companyName} pathname={pathname} />
        <StyledAdminStage>
          <Switch>
            <AdminAuthWrapper
              path="/admin-dashboard/results/dashboard"
              component={AdminResults}
            />
            <AdminAuthWrapper
              path="/admin-dashboard/results/graph"
              component={AdminResults}
            />
            <AdminAuthWrapper
              path="/admin-dashboard/users/add"
              component={UserPage}
            />
            <AdminAuthWrapper
              path="/admin-dashboard/users/manage"
              component={UserManagementPage}
            />
            <AdminAuthWrapper
              path="/admin-dashboard/users/sms/send"
              component={OverDuePage}
            />
            <AdminAuthWrapper
              path="/admin-dashboard/users/sms/schedule"
              component={SchedulePage}
            />
            <AdminAuthWrapper
              path="/admin-dashboard/surveys/ps"
              component={ParticipantSurvey}
            />
            <AdminAuthWrapper
              path="/admin-dashboard/surveys/ms"
              component={ManagementSurvey}
            />
            <AdminAuthWrapper
              path="/admin-dashboard/assign/ms"
              component={AssignSurveysPage}
            />
            <AdminAuthWrapper
              path="/admin-dashboard/assign/ps"
              component={AssignSurveysPage}
            />
            <AdminAuthWrapper
              path="/admin-dashboard/newcompany/company-confirm"
              component={ConfirmCompany}
            />
            <AdminAuthWrapper
              path="/admin-dashboard/newcompany/confirm"
              component={ConfirmationPage}
            />
            <AdminAuthWrapper
              exact
              path="/admin-dashboard/newcompany"
              component={CompanyPage}
            />
            <AdminAuthWrapper
              exact
              path="/admin-dashboard"
              component={DashLogo}
            />
          </Switch>
          <BottomNav pathname={pathname} />
        </StyledAdminStage>
      </StyledHome>
    </Suspense>
  );
};

export default AdminDashboard;
