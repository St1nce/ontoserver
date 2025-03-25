import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import {
  loadAllClasses,
  loadClassInfo,
  loadEmptyClassInfo,
} from "Loaders/WikiView/ClassesLoader";
import { mainStore } from "Stores/MainStore";
import {
  loadAllIndividuals,
  loadIndividualInfo,
  loadEmptyIndividualInfo,
} from "Loaders/WikiView/IndividualsLoader";
import { loadAllObjectProperties } from "Loaders/WikiView/ObjectPropertyLoader";
import { loadAllDataProperties } from "Loaders/WikiView/DataPropertyLoader";
import MainView from "Views/MainView/MainView";
import ProfileView from "Views/ProfileView/ProfileView";

// Подключение стилей
import "./Components/Button.css";
import "./Components/Modal.css";
import "./Components/ErrorMessage.css";
import "./Components/Input.css";
import "./Components/Link.css";
import "./index.css";
import { WikiView } from "Views/WikiView/WikiView";
import Banner from "Views/MainView/Components/Banner";
import { ClassHelp } from "Views/WikiView/Help/ClassHelp";
import ClassContent from "Views/WikiView/Content/ClassContent/ClassContent";
import { IndividualHelp } from "Views/WikiView/Help/IndividualHelp";
import IndividualContent from "Views/WikiView/Content/IndividualContent/IndividualContent";
import SelectionLCContent from "Views/WikiView/Content/SelectionLearningContentView/SelectionLearningContentView";
import { Provider } from "mobx-react";
import RequereAuth from "Views/AuthView/RequereAuth";
import { loadConfirmation, loadUserInfo } from "Loaders/UserLoader";
import { ConfirmationView } from "Views/ConfirmationView/ConfirmationView";
import { LC_FORM_ID, LEARNER_ID } from "LCConstants";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainView />,
    children: [
      {
        index: true,
        element: <Banner />,
      },
      {
        path: "/wiki/class",
        element: <WikiView />,
        loader: async () => {
          return defer({
            loadAside: loadAllClasses(),
          });
        },
        children: [
          {
            index: true,
            element: <ClassHelp />,
          },
          {
            path: ":classId",
            element: <ClassContent />,
            loader: async ({ params }) => {
              return defer({
                loadClass: loadClassInfo({ params }),
              });
            },
          },
          {
            path: "create",
            element: (
              <RequereAuth>
                <ClassContent />
              </RequereAuth>
            ),
            loader: async () => {
              return defer({
                loadClass: loadEmptyClassInfo().then((classData) => {
                  classData.parentsIds = [LC_FORM_ID];

                  return classData;
                }),
              });
            },
          },
        ],
      },
      {
        path: "/wiki/individual",
        element: <WikiView />,
        loader: async () => {
          return defer({
            loadAside: loadAllIndividuals(),
          });
        },
        children: [
          {
            index: true,
            element: <IndividualHelp />,
          },
          {
            path: ":individualId",
            element: <IndividualContent />,
            loader: async ({ params }) => {
              return defer({
                loadIndividualAndObjectProperties: Promise.all([
                  loadIndividualInfo({ params }),
                  loadAllObjectProperties(LC_FORM_ID),
                ]),
              });
            },
          },
          {
            path: "create",
            element: (
              <RequereAuth>
                <IndividualContent />
              </RequereAuth>
            ),
            loader: async () => {
              return defer({
                loadIndividualAndObjectProperties: Promise.all([
                  loadEmptyIndividualInfo().then((individualData) => {
                    individualData.classesIds = [LC_FORM_ID];

                    return individualData;
                  }),
                  loadAllObjectProperties(LC_FORM_ID),
                ]),
              });
            },
          },
        ],
      },
      {
        path: "/content",
        element: <SelectionLCContent />,
        loader: async () => {
          return defer({
            loadDataProperties: loadAllDataProperties(LEARNER_ID),
            loadObjectProperties: loadAllObjectProperties(LEARNER_ID),
          });
        },
      },
      {
        path: "/profile",
        element: (
          <RequereAuth>
            <ProfileView />
          </RequereAuth>
        ),
        loader: async () => {
          return defer({
            loadUserInfo: loadUserInfo(),
          });
        },
      },
      {
        path: "/mail/confirmation/:confirmationId",
        element: <ConfirmationView />,
        loader: async ({ params }) => {
          return defer({
            loadConfirmation: loadConfirmation({ params }),
          });
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={mainStore}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
