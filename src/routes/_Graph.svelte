<script>
    import { Graphic, FuncLine, XAxis, YAxis } from "@snlab/florence";
    import { KDH } from "./scales";
    import { parseResidueString, min, max } from "./scale";
    const testProt = "MLELLPTAVEGVSQAQITGRPEWIWLALGTALMGLGTLYFLVKGMGVSDPDAKKFYAITTLVPAIAFTMYLSMLLGYGLTMVPFGGEQNPIYWARYADWLFTTPLLLLDLALLVDADQGTILALVGADGIMIGTGLVGALTKVYSYRFVWWAISTAAMLYILYVLFFGFTSKAESMRPEVASTFKVLRNVTVVLWSAYPVVWLIGSEGAGIVPLNIETLLFMVLDVSAKVGFGLILLRSRAIFGEAEAPEPSAGDGAAATSD";
    const series = parseResidueString(testProt, 5, KDH, false);
</script>

<Graphic
    width={1500}
    height={500}
    scaleX={[0, series.length]}
    scaleY={[min(series), max(series)]}
    padding={20}
>
    <FuncLine func={x => series[Math.floor(x)]} stroke={'blue'} strokeWidth=1 />
    <XAxis />
    <YAxis />
</Graphic>
