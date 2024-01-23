import { useQuery } from "@tanstack/react-query";
import { ACTIVITES, getActivities } from "./activity";

const keys = {
  activities: {
    list: () => [ACTIVITES, "list"],
  },
};

function useGetActivities() {
  const result = useQuery({
    queryKey: keys.activities.list(),
    queryFn: getActivities,
  });

  return result;
}

export { keys, useGetActivities };
