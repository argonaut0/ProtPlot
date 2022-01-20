<script>
    import { Graphic, FuncLine, XAxis, YAxis } from "@snlab/florence";
    import { KDH } from "./scales";
    import { parseResidueString, min, max } from "./scale";
    
    export let residue;
    export let scale;
    export let window;
    let series;
    $: series = residue ? parseResidueString(residue, window, scale, false) : [0];
</script>

<Graphic
    width={1000}
    height={500}
    scaleX={[0, series.length]}
    scaleY={[max(series), min(series)]}
    padding={60}
>
    <FuncLine func={x => series[Math.floor(x)]} stroke={'blue'} strokeWidth=1 />
    <XAxis />
    <YAxis />
</Graphic>
