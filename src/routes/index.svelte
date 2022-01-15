<script>
    import Graph from "./_graph.svelte";
    import Button, { Label } from '@smui/button';
    import Textfield from "@smui/textfield";
    import Select, { Option } from '@smui/select';
    import CharacterCounter from '@smui/textfield/character-counter';
    import { Mappings } from './scales';
    const testProt = "MLELLPTAVEGVSQAQITGRPEWIWLALGTALMGLGTLYFLVKGMGVSDPDAKKFYAITTLVPAIAFTMYLSMLLGYGLTMVPFGGEQNPIYWARYADWLFTTPLLLLDLALLVDADQGTILALVGADGIMIGTGLVGALTKVYSYRFVWWAISTAAMLYILYVLFFGFTSKAESMRPEVASTFKVLRNVTVVLWSAYPVVWLIGSEGAGIVPLNIETLLFMVLDVSAKVGFGLILLRSRAIFGEAEAPEPSAGDGAAATSD";
    let residue = "G";
    let enteredString = "";
    let windowsize = 3;
    let invalid_window;
    $: invalid_window = windowsize <= 0 || Math.floor(windowsize) !== windowsize
    let window = windowsize;
    let mapping = Mappings[0];
    
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
<Graph {residue} scale={mapping.scale} {window}/>
<Button on:click={()=>{enteredString = testProt; residue = testProt}}>
    <Label>Try a Test Protein</Label>
</Button>
<Select bind:value={mapping} label="Select Scale">
    {#each Mappings as map}
        <Option value={map}>{map.name}</Option>
    {/each}
</Select>
<Textfield bind:value={windowsize} invalid={invalid_window} label="Window Size" type="number" on:input={()=>(window = windowsize)} />
<Textfield textarea
    input$rows={4}
    input$cols={20}
    input$resizable={false}
    variant="outlined"
    bind:value={enteredString}
    label="Enter 1-letter residue sequence"
    input$maxlength={1000000000}
    on:input={()=>{if (enteredString) {residue = enteredString;}}}
    >
    <CharacterCounter slot="internalCounter">0 / 1000000000</CharacterCounter>
</Textfield>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
