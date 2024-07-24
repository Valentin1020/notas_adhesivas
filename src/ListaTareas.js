import React, { useEffect, useRef, useState } from "react";
import Descripcion from "./Descripcion";
import { v4 as uuid } from 'uuid';
import Titulo from "./Titulo";
import "./Estilo.css"

export default function ListaTareas() {
    
    const [notas, setNotas] = useState([]);
    const [esImportante, setEsImportante] = useState(false);
    
    const descripcionRef = useRef();
    const tituloRef = useRef();
    
    useEffect(() => {
        const Notas = JSON.parse(localStorage.getItem("notas"));
        if (Notas) {
            setNotas(Notas);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("notas", JSON.stringify(notas));
    }, [notas]);
    
    const agregarNota = () => {
        const descripcion = descripcionRef.current.value;
        const titulo = tituloRef.current.value;
        //const div_error = document.getElementById("error");
        if (!descripcion)return; 
            //div_error.innerHTML = "La descripcion es obligatoria";
            //div_error.className = "text-danger small mt-1";
             
        const nuevaNota = {
            id: uuid(),
            titulo: titulo,
            descripcion: descripcion,
            esImportante: esImportante
        };

        setNotas(prev => [...prev, nuevaNota]);
    };

    const cambiarImportancia = () => {
        setEsImportante(prev => !prev); 
    };

    return (
       
        <div>
            <h2>Sticky Notes</h2>
            <form>
                <div className="row my-4">
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <label>Título:</label>
                        <input ref={tituloRef} className="form-control" placeholder="Ingrese el titulo"></input>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <label>Descripción:</label>
                        <input ref={descripcionRef} className="form-control" placeholder="Ingrese la descripcion" required></input>
                        <div id="error"></div>
                    </div>
                    <div className="col-lg-2 col-md-4 col-sm-6 mb-4 ">
                        <label className="form-check-label" for="importantCheck">Importante</label>
                        <input type="checkbox" className="form-check-input" id="importanteCheck" onChange={cambiarImportancia}></input>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
                        <button onClick={agregarNota} className="btn col-lg-3 col-md-4 col-sm-6 mb-4">Agregar Nota</button>
                    </div>    
                </div>
            </form>
            <div className="row">
                {notas.map(nota => (
                    <div key={nota.id} className={` ${nota.esImportante ? 'importante' : 'normal'}`}>
                        <Titulo titulo={nota.titulo} />
                        <Descripcion descripcion={nota.descripcion}/>
                    </div>
                ))}
            </div>
        </div>
        
    )
} 