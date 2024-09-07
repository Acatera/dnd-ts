<script lang="ts">
    let minValue = 0;
    let maxValue = 100;
    let value = 50;
    let backgroundColor = "black";
    let barColor = "red";
    let showValue: ShowValue = "value";
    
    type ShowValue = "percentage" | "value" | "none";

    export {
        minValue,
        maxValue,
        value,
        backgroundColor,
        barColor,
        showValue,
    };

    let progress = ((value - minValue) / (maxValue - minValue)) * 100;
</script>

<main>
    <div
        class="progress-bar"
        style="background-color: {backgroundColor}; border-color: {barColor}"
        data-text={showValue === "percentage"
            ? `${((value - minValue) / (maxValue - minValue)) * 100}%`
            : showValue === "value"
                ? `${value} / ${maxValue}`
                : ""
            }
    >
        <div
            class="progress"
            style="width: {((value - minValue) / (maxValue - minValue)) * 100}%; background-color: {barColor}"
        ></div>
    </div>
</main>

<style>
    .progress-bar {
        width: 100%;
        border-width: 1px;
        border-style: solid;
        border-image: initial;
        font-size: 10px;
        text-align: center;
        position: relative; /* Make the progress-bar container relative */
        color: white; /* Set the text color to contrast with the background */
    }

    .progress {
        transition: width 0.2s;
        height: 10px;
        z-index: 1; /* Ensure the progress bar is beneath the text */
    }

    .progress-bar::before {
        content: attr(data-text); /* Use this to insert the dynamic text */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2; /* Ensure text appears above the progress bar */
    }
</style>
