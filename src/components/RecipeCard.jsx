export default function RecipeCard({ recipe, onDelete, onToggleVegetarian }) {
  return (
    <li>
      <strong>{recipe.title}</strong>
      <span>{recipe.cuisine}</span>
      <span>{recipe.vegetarian ? '🌱' : ''}</span>
      <button onClick={() => onToggleVegetarian(recipe.id, recipe)}>
        Toggle Vegetarian
      </button> 
      <button onClick={() => onDelete(recipe.id)}>Delete</button>
    </li>
  )
}
