<script>
    import Graph from "./_graph.svelte";
    import Button, { Label } from '@smui/button';
    import Textfield from "@smui/textfield";
    import HelperText from '@smui/textfield/helper-text';
    import CharacterCounter from '@smui/textfield/character-counter';
    const testProt = "MLELLPTAVEGVSQAQITGRPEWIWLALGTALMGLGTLYFLVKGMGVSDPDAKKFYAITTLVPAIAFTMYLSMLLGYGLTMVPFGGEQNPIYWARYADWLFTTPLLLLDLALLVDADQGTILALVGADGIMIGTGLVGALTKVYSYRFVWWAISTAAMLYILYVLFFGFTSKAESMRPEVASTFKVLRNVTVVLWSAYPVVWLIGSEGAGIVPLNIETLLFMVLDVSAKVGFGLILLRSRAIFGEAEAPEPSAGDGAAATSD";
    let residue = "G";
    let enteredString = "";
    let windowsize = 3;
    let invalid_window;
    $: invalid_window = windowsize <= 0 || Math.floor(windowsize) !== windowsize

    
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
<Graph {residue} />
<Button on:click={()=>{residue = enteredString}}>
    <Label>Submit</Label>
</Button>
<Textfield bind:value={windowsize} invalid={invalid_window} label="Window Size" type="number" />
<Textfield textarea
    input$rows={4}
    input$cols={20}
    input$resizable={false}
    variant="outlined"
    bind:value={enteredString}
    label="Enter 1-letter residue sequence"
    input$maxlength={1000000000}
    >
    <CharacterCounter slot="internalCounter">0 / 1000000000</CharacterCounter>
</Textfield>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
