<script>
    export let colSpan = 1; // Default 1 column span
    export let rowSpan = 1; // Default 1 row span
    export let maxHeight = "auto";
</script>

<div
    class="grid-item"
    style="
      grid-column: span {colSpan};
      grid-row: span {rowSpan};
      max-height: {maxHeight};
      overflow-y: auto;
    "
>
    <slot></slot>
</div>