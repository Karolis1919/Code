<?php
$errors = [];
if(isset($_POST['submit'])) {
    if($_POST['svoris'] >= 20) {
        $kaina = $_POST['kaina'] + 30;
        $mokestis = "(".$_POST['kaina']."€+30€ Mokestis už svorį)";
    }else {
        $kaina = $_POST['kaina'];
        $mokestis = "";
    }
    $errors = [];
    if(!preg_match('/^[a-zA-Z]{3,20}$/', $_POST['vardas'])) {
      $errors[] = "Varde gali būti tik 3-20 simbolių ir jokių skaičių";
    }
    else {
      $_POST['vardas'];
    }
    if(!preg_match('/^[a-zA-Z]{3,20}$/', $_POST['pavarde'])) {
      $errors[] = "Pavardej gali būti tik 3-20 simbolių ir jokių skaičių";
    }
    else {
      $_POST['pavarde'];
    }
    if(!preg_match('/^[a-zA-Z0-9\s]{10,200}$/', $_POST['pastabos'])) {
      $errors[] = "Leidžiamas pastabos simbolių kiekis 10-200";
    }
    else {
      $_POST['pastabos'];
    }
    if(!preg_match('/^[0-9]{11,11}$/', $_POST['kodas'])) {
      $errors[] = "Asmens kodas netinkamas";
    }
    else {
      $_POST['kodas'];
    }
    if($_POST['vardas'] == "" && $_POST['pavarde'] == "" && $_POST['pastabos'] == "" && $_POST['kodas'] == "" && $_POST['price'] == "") {
        $errors[] = "Privalomi visi laukai";
      }
  
  
}

if(count($errors) > 0) {
    foreach($errors as $error) {
        echo '<div class="alert alert-warning" role="alert">'.$error.'</div>';
    }
}

$skrydzioNr = [111, 112, 113, 114, 115, 116, 117, 118, 119, 120];
$svoris = [0, 10, 20, 30, 40, 50];
$isKur = ['Kaunas', 'Vilnius', 'Amsterdamas', 'Niujorkas', 'Ryga'];
$iKur = ['Kaunas', 'Vilnius', 'Amsterdamas', 'Niujorkas', 'Ryga'];
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <link rel="stylesheet" href="view/css/style.css">
        <title>Air</title>
    </head>
<body>
<div class="container">
<div class="row">
    <form class="col-3" method="POST">
        <div class="form-group">
            <label>Numeris</label>
            <select name="numeris" class="form-control">
                <?php foreach($skrydzioNr as $number): ?>
                <option value="<?=$number;?>"><?=$number;?></option>
                <?php endforeach; ?>
            </select>
        </div>
        <div class="form-group">
            <label>Asmens Kodas</label>
<div class="row">
    <input name="kodas" maxlength="11" type="number" class="col form-control" placeholder="Asmens Kodas">
</div>
</div>
        <div class="form-group">
            <label>Vardas</label>
                <input name="vardas" type="text" class="form-control" maxlength="20" placeholder="Iveskite varda">
        </div>
        <div class="form-group">
            <label>Pavardė</label>
                <input name="pavarde" type="text" class="form-control" maxlength="20" placeholder="Iveskite pavarde">
        </div>
        <div class="form-group">
            <label>Iš kur</label>
            <select name="isKur" class="form-control">
                <?php foreach($isKur as $from): ?>
                <option value="<?=$from;?>"><?=$from;?></option>
                <?php endforeach; ?>
            </select>
        </div>
        <div class="form-group">
            <label>Į kur</label>
            <select name="iKur" class="form-control">
                <?php foreach($iKur as $where): ?>
                <option value="<?=$where;?>"><?=$where;?></option>
                <?php endforeach; ?>
            </select>
        </div>
        <div class="form-group">
            <label>Kaina</label>
                <input name="kaina" type="number" class="form-control" placeholder="Kaina">
        </div>
        <div class="form-group">
            <label>Svoris</label>
            <select name="svoris" class="form-control">
                <?php foreach($svoris as $weight): ?>
                <option value="<?=$weight;?>"><?=$weight;?> Kg</option>
                <?php endforeach; ?>
            </select>
        </div>
        <div class="form-group">
            <label>Pastabos</label>
                <textarea minlenght="10" maxlenght="200" class="form-control" id="pastabos" name='pastabos' ></textarea>
        </div>
    <button name="submit" type="submit" class="btn btn-success">Pildyti</button>
  </form>
  <section class="col-8">
      <?php if(count($errors)==0 && isset($_POST['submit'])):?>
        <div class="col-8 row">
            <p class="col"><span>Numeris</span>: <?=($_POST['numeris']);?></p>
            <p class="col-3"><span>Į</span>: <?=($_POST['iKur']);?><br>
            <p><span>Iš</span>: <?=$_POST['isKur'];?></p>
            <p class="col-8"><span>Vardas:</span> <?=($_POST['vardas']);?><br><span>Pavardė:</span> <?=($_POST['pavarde']);?></p><br>
            <p><span>Asmens kodas</span>:<?=($_POST['kodas']);?></p>
            <p class="col-10"><span>Pastabos</span>: <?=($_POST['pastabos']);?></p>
        </div>
    <div class="summary col-10">
        <p><span>Mokestis už skrydį</span>: <?=($_POST['kaina']);?>€</p>
        <p><span>Svoris</span>: <?=($_POST['svoris']);?>kg</p>
        <p><span>Iš viso:</span>: <?=($kaina).'€'.$mokestis;?></p>
    </div>
</div>
        <?php endif;?>
</div>
  </section>
</div>