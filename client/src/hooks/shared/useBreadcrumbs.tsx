import { createContext, useContext, useEffect, useState } from "react";
import { matchPath, useLocation } from "react-router-dom";

export type BreadcrumbItemType = {
  value: string;
  route: string;
  last: boolean;
  disabled?: boolean;
};

export type BreadcrumbsContextType = {
  breadcrumbs: BreadcrumbItemType[];
  setBreadcrumbs: (value: BreadcrumbItemType[]) => void;
  disabledRoutes?: string[];
};

const defaultValues: BreadcrumbsContextType = {
  breadcrumbs: [],
  setBreadcrumbs: () => {},
};

const BreadcrumbsContext = createContext<BreadcrumbsContextType>(defaultValues);

export const BreadcrumbsProvider = ({
  children,
  disabledRoutes,
}: React.PropsWithChildren<{ disabledRoutes?: string[] }>) => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItemType[]>([]);
  return (
    <BreadcrumbsContext.Provider
      value={{ breadcrumbs, setBreadcrumbs, disabledRoutes }}
    >
      {children}
    </BreadcrumbsContext.Provider>
  );
};

export default function useBreadcrubms() {
  const { breadcrumbs, setBreadcrumbs, disabledRoutes } =
    useContext(BreadcrumbsContext);

  const { pathname } = useLocation();

  useEffect(() => {
    const pathnames = location.pathname.split("/").filter((x) => x);
    const plength = pathnames.length - 1;

    const breadcrumbItems = pathnames.map<BreadcrumbItemType>((item, i) => {
      const route = `/${pathnames.slice(0, i + 1).join("/")}`;

      let disabled = false;

      if (disabledRoutes) {
        disabled = disabledRoutes.some((v) => {
          const matches = matchPath({ path: v }, route) !== null;
          return matches;
        });
      }

      return {
        value: item,
        alt: undefined,
        route: route,
        last: i === plength,
        disabled: disabled,
      };
    });
    setBreadcrumbs(breadcrumbItems);
  }, [pathname]);

  return {
    breadcrumbs,
  };
}
