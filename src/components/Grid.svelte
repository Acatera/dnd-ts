<script>
    export let columns = '1fr 1fr'; // Default two equal columns
    export let rows = 'auto'; // Default automatic rows
    export let gap = '1rem'; // Default gap between items
    export let align = 'stretch'; // Default alignment
    export let justify = 'stretch'; // Default justification

  </script>
  
  <div
    class="grid-container"
    style="
      display: grid;
      grid-template-columns: {columns};
      grid-template-rows: {rows}; 
      gap: {gap};
      align-items: {align};
      justify-items: {justify};
      max-height: 100vh;
      overflow: hidden;
    "
  >
    <slot></slot>
  </div>
  