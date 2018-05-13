<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Complex
 *
 * @author CQJ8660
 */
class Complex {
    var $real;
    var $virtual;
    function setreal($temp)
    {
        $this->real = $temp;
    }
    function setvir($temp)
    {
        $this->virtual = $temp;
    }
    function pprint()
    {
        echo "$this->real"+"+"+"$this->virtual"+"i";
    }
    //put your code here
}
?>