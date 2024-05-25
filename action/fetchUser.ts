import { PrismaCli } from "../prismaCli/prismaClient";

export const fetchUser = async (
  filter?: string,
  page?: string,
  searchTerm?: string
) => {
  const filterNum = Number(filter);
  const postsPerPage = (filterNum > 6 ? 6 : filterNum) || 5;
  const currentPage = Number(page) || 1;

  let searchQury = "";

  if (searchTerm && searchTerm !== "") {
    searchQury = searchTerm;
  }

  const totalUsers = await PrismaCli.user.count();
  const skipUser = postsPerPage * (currentPage - 1);
  console.log("skip", skipUser);
  let totalPages;
  if (!searchTerm || searchTerm === "") {
    totalPages = Math.ceil(totalUsers / postsPerPage);
  }

  try {
    const result = await PrismaCli.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        status: true,
      },
      where: {
        OR: [
          { username: { contains: searchQury, mode: "insensitive" } },
          { email: { contains: searchQury, mode: "insensitive" } },
        ],
      },
      take: postsPerPage,
      skip: skipUser,
    });

    if (searchTerm && searchTerm !== "") {
      totalPages = result.length + 1;
    }

    return { result, totalPages };
  } catch (err: any) {
    throw new Error("Fetch User Failed");
  }
};
