type Champion = {
  name: string;
};

type ChampSelect = {
  myTeam: Champion[];
  enemyTeam: Champion[];
};

export async function getChampSelect(): Promise<ChampSelect> {
  return {
    myTeam: [
      { name: "diana" },
      { name: "nocturne" },
      { name: "missfortune" },
      { name: "leona" },
      { name: "jax" },
    ],
    enemyTeam: [
      { name: "vex" },
      { name: "udyr" },
      { name: "vayne" },
      { name: "lulu" },
      { name: "tryndamere" },
    ],
  }
}

