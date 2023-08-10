import Category from "./Category";

const CATEGORIES_DUMMY = [
  {
    id: 0,
    iconName: "infinite-outline",
    title: "All",
  },
  {
    id: 1,
    iconName: "bed-outline",
    title: "Hotels",
  },

  {
    id: 2,
    iconName: "restaurant-outline",
    title: "Restaurants",
  },

  {
    id: 3,
    iconName: "cut-outline",
    title: "Salons",
  },

  {
    id: 4,
    iconName: "heart-outline",
    title: "Hospitals",
  },

  {
    id: 5,
    iconName: "barbell-outline",
    title: "Fitness",
  },

  {
    id: 6,
    iconName: "build-outline",
    title: "Masters",
  },
  {
    id: 7,
    iconName: "sparkles-outline",
    title: "Other",
  },
];

const Categories = ({ onClick }) => {
  return (
    <ul className="container_categories">
      {CATEGORIES_DUMMY.map((category) => (
        <li onClick={() => onClick(category.title)}>
          <Category iconName={category.iconName} title={category.title} />
        </li>
      ))}
    </ul>
  );
};

export default Categories;
