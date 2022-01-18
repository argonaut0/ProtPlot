<script>
    import Graph from "./_graph.svelte";
    import Button, { Label } from '@smui/button';
    import Textfield from "@smui/textfield";
    import Select, { Option } from '@smui/select';
    import CharacterCounter from '@smui/textfield/character-counter';
    import { Mappings } from './scales';
    const testProt = "MLELLPTAVEGVSQAQITGRPEWIWLALGTALMGLGTLYFLVKGMGVSDPDAKKFYAITTLVPAIAFTMYLSMLLGYGLTMVPFGGEQNPIYWARYADWLFTTPLLLLDLALLVDADQGTILALVGADGIMIGTGLVGALTKVYSYRFVWWAISTAAMLYILYVLFFGFTSKAESMRPEVASTFKVLRNVTVVLWSAYPVVWLIGSEGAGIVPLNIETLLFMVLDVSAKVGFGLILLRSRAIFGEAEAPEPSAGDGAAATSD";
    let residueString = "";
    let windowSize = 3;
    let mapping = Mappings[0];

    function validateWindow() {
        if (windowSize < 1) {
            windowSize = 1;
        }

        if (windowSize > residueString.length) {
            windowSize = residueString.length;
        }
    }
    
</script>

<head>
    <!-- Material Icons -->
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
    />
    <!-- Roboto -->
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
    />
    <!-- Roboto Mono -->
    <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto+Mono"
    />
    <!-- SMUI Styles -->
    <link rel="stylesheet" href="/smui.css" />
</head>

<h1>ProtPlot v0.1</h1>
<Graph residue={residueString} scale={mapping.scale} window={windowSize}/>
<Button on:click={()=>{residueString = testProt}}>
    <Label>Try a Test Protein</Label>
</Button>
<Select 
    key={(map) => map.name}
    bind:value={mapping} label="Select Scale">
    {#each Mappings as map (map.name)}
        <Option value={map}>{map.name}</Option>
    {/each}
</Select>
<Textfield bind:value={windowSize} label="Window Size" type="number" on:input={validateWindow} />
<Textfield textarea
    input$rows={4}
    input$cols={20}
    input$resizable={false}
    variant="outlined"
    bind:value={residueString}
    label="Enter 1-letter residue sequence"
    input$maxlength={1000000000}
    >
    <CharacterCounter slot="internalCounter">0 / 1000000000</CharacterCounter>
</Textfield>
