import React, { useState } from 'react';
import { Input, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button } from 'reactstrap';
import AddNewAddressInput from './AddNewAddressInput';
import { addNewRow } from '../utils/gridActions';
import { AiFillUpCircle } from 'react-icons/ai';

const AddNewRow = (props) => {
    const [degreeDropdownOpen, setDegreeDropdownOpen] = useState(false);
    const degree_toggle = () => setDegreeDropdownOpen(prevState => !prevState);
    const [degree, setDegree] = useState("DPM");
    
    const [specialtyDropdownOpen, setSpecialtyDropdownOpen] = useState(false);
    const specialty_toggle = () => setSpecialtyDropdownOpen(prevState => !prevState);
    const [specialty, setSpecialty] = useState("PRIMARY TREATING PHYSICIAN");
    
    const [dwcDropdownOpen, setDwcDropdownOpen] = useState(false);
    const dwc_toggle = () => setDwcDropdownOpen(prevState => !prevState);
    const [dwc, setDwc] = useState("PRIMARY TREATING PHYSICIAN");
    
    const [codeDropdownOpen, setCodeDropdownOpen] = useState(false);
    const code_toggle = () => setCodeDropdownOpen(prevState => !prevState);
    const [code, setCode] = useState("MISC");

    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [entity, setEntity] = useState('');
    const [suite, setSuite] = useState('');
    const [zip, setZip] = useState('');
    const [phone, setPhone] = useState('');
    const [fax, setFax] = useState('');
    const [taxid, setTaxid] = useState('');
    const [statelicensenumber, setStatelicensenumber] = useState('');
    const [county, setCounty] = useState('');
    const [workinghrs, setWorkinghrs] = useState('');
    const [priority, setPriority] = useState('');
    const [newid, setNewid] = useState('');

    const saveNewRow = () => {
        const referral = document.getElementById("referral").checked;
        const mpn3095 = document.getElementById("mpn3095").checked;
        const mpn3096 = document.getElementById("mpn3096").checked;
        const mpn3097 = document.getElementById("mpn3097").checked;
        const mpn0701 = document.getElementById("mpn0701").checked;
        const mpn2347 = document.getElementById("mpn2347").checked;
        const mpn2125 = document.getElementById("mpn2125").checked;
        const mpn2128 = document.getElementById("mpn2128").checked;
        const mpn2126 = document.getElementById("mpn2126").checked;
        const mpn2127 = document.getElementById("mpn2127").checked;
        const mpn2129 = document.getElementById("mpn2129").checked;
        const mpn2130 = document.getElementById("mpn2130").checked;
        const mpn2173 = document.getElementById("mpn2173").checked;
        const mpn2079 = document.getElementById("mpn2079").checked;
        const mpn1635 = document.getElementById("mpn1635").checked;
        const mpn1636 = document.getElementById("mpn1636").checked;
        const mpn1637 = document.getElementById("mpn1637").checked;
        const mpn2474 = document.getElementById("mpn2474").checked;
        const mpn2473 = document.getElementById("mpn2473").checked;
        const mpn0598 = document.getElementById("mpn0598").checked;
        const mpn2502 = document.getElementById("mpn2502").checked;
        const mpn2469 = document.getElementById("mpn2469").checked;
        const mpn2468 = document.getElementById("mpn2468").checked;
        const mpn2376 = document.getElementById("mpn2376").checked;
        const mpn2394 = document.getElementById("mpn2394").checked;
        const mpn1203 = document.getElementById("mpn1203").checked;
        const mpn3104 = document.getElementById("mpn3104").checked;
        const deleted = document.getElementById("deleted").checked;

        addNewRow(props.gridApi, {firstname, lastname, degree, entity, specialty, dwc, code,
            suite, address, city, state, zip, phone, fax, latitude, longitude, taxid, statelicensenumber, county, workinghrs, priority, referral, newid, 
            mpn3095, mpn3096, mpn3097, mpn0701, mpn2347, mpn2125, mpn2128, mpn2126, mpn2127, mpn2129, mpn2130, mpn2173, mpn2079, mpn1635, mpn1636, mpn1637, 
            mpn2474, mpn2473, mpn0598, mpn2502, mpn2469, mpn2468, mpn2376, mpn2394, mpn1203, mpn3104, deleted});
    }

    return (
        <div className="newRowArea">
            <div className="inputArea">
                <div><Input placeholder="firstname" bsSize="sm" value={firstname} onChange={(e) => setFirstname(e.target.value.toUpperCase())} /></div>
                <div><Input placeholder="lastname" bsSize="sm" value={lastname} onChange={(e) => setLastname(e.target.value.toUpperCase())} /></div>
                <div>
                    <Dropdown isOpen={degreeDropdownOpen} toggle={degree_toggle} size="sm" >
                        <DropdownToggle caret style={{width: '80px'}}>
                            {degree}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => setDegree('DPM')}>DPM</DropdownItem>
                            <DropdownItem onClick={() => setDegree('MD')}>MD </DropdownItem>
                            <DropdownItem onClick={() => setDegree('PHD')}>PHD</DropdownItem>
                            <DropdownItem onClick={() => setDegree('PT')}>PT </DropdownItem>
                            <DropdownItem onClick={() => setDegree('DO')}>DO </DropdownItem>
                            <DropdownItem onClick={() => setDegree('LAC')}>LAC</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div><Input placeholder="entity" bsSize="sm" value={entity} onChange={(e) => setEntity(e.target.value.toUpperCase())} /></div>
                <div style={{width: '240px'}}>
                    <Dropdown isOpen={specialtyDropdownOpen} toggle={specialty_toggle} size="sm" >
                        <DropdownToggle caret style={{width: '230px'}}>
                            {specialty}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => setSpecialty('PRIMARY TREATING PHYSICIAN')}>PRIMARY TREATING PHYSICIAN</DropdownItem>
                            <DropdownItem onClick={() => setSpecialty('ORTHOPEDICS')}>ORTHOPEDICS </DropdownItem>
                            <DropdownItem onClick={() => setSpecialty('ORTHOPEDIC')}>ORTHOPEDIC</DropdownItem>
                            <DropdownItem onClick={() => setSpecialty('SPINE SURGERY')}>SPINE SURGERY </DropdownItem>
                            <DropdownItem onClick={() => setSpecialty('NEUROLOGY')}>NEUROLOGY </DropdownItem>
                            <DropdownItem onClick={() => setSpecialty('HAND SURGERY')}>HAND SURGERY</DropdownItem>
                            <DropdownItem onClick={() => setSpecialty('HANDSURGERY')}>HANDSURGERY</DropdownItem>
                            <DropdownItem onClick={() => setSpecialty('PODIATRY')}>PODIATRY</DropdownItem>
                            <DropdownItem onClick={() => setSpecialty('OCCUPATIONAL HEALTH CENTER')}>OCCUPATIONAL HEALTH CENTER</DropdownItem>
                            <DropdownItem onClick={() => setSpecialty('PODIATRIC SURGERY')}>PODIATRIC SURGERY</DropdownItem>
                            <DropdownItem onClick={() => setSpecialty('PHYSICAL THERAPY')}>PHYSICAL THERAPY</DropdownItem>
                            <DropdownItem onClick={() => setSpecialty('ORTHOPEDIC SURGERY')}>ORTHOPEDIC SURGERY</DropdownItem>
                            <DropdownItem onClick={() => setSpecialty('OCCUPATIONAL MEDICINE')}>OCCUPATIONAL MEDICINE</DropdownItem>
                            <DropdownItem onClick={() => setSpecialty('MENTAL HEALTH')}>MENTAL HEALTH</DropdownItem>
                            <DropdownItem onClick={() => setSpecialty('ACUPUNCTURE')}>ACUPUNCTURE</DropdownItem>
                            <DropdownItem onClick={() => setSpecialty('PSYCHOLOGY')}>PSYCHOLOGY</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                {/* <div><Input placeholder="dwc" bsSize="sm" value={dwc} onChange={(e) => setDwc(e.target.value.toUpperCase())} /></div> */}
                <div style={{width: '240px'}}>
                    <Dropdown isOpen={dwcDropdownOpen} toggle={dwc_toggle} size="sm" >
                        <DropdownToggle caret style={{width: '230px'}}>
                            {dwc}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => setDwc('PRIMARY TREATING PHYSICIAN')}>PRIMARY TREATING PHYSICIAN</DropdownItem>
                            <DropdownItem onClick={() => setDwc('ORTHOPEDICS')}>ORTHOPEDICS </DropdownItem>
                            <DropdownItem onClick={() => setDwc('ORTHOPEDIC')}>ORTHOPEDIC</DropdownItem>
                            <DropdownItem onClick={() => setDwc('SPINE SURGERY')}>SPINE SURGERY </DropdownItem>
                            <DropdownItem onClick={() => setDwc('NEUROLOGY')}>NEUROLOGY </DropdownItem>
                            <DropdownItem onClick={() => setDwc('HAND SURGERY')}>HAND SURGERY</DropdownItem>
                            <DropdownItem onClick={() => setDwc('HANDSURGERY')}>HANDSURGERY</DropdownItem>
                            <DropdownItem onClick={() => setDwc('PODIATRY')}>PODIATRY</DropdownItem>
                            <DropdownItem onClick={() => setDwc('OCCUPATIONAL HEALTH CENTER')}>OCCUPATIONAL HEALTH CENTER</DropdownItem>
                            <DropdownItem onClick={() => setDwc('PODIATRIC SURGERY')}>PODIATRIC SURGERY</DropdownItem>
                            <DropdownItem onClick={() => setDwc('PHYSICAL THERAPY')}>PHYSICAL THERAPY</DropdownItem>
                            <DropdownItem onClick={() => setDwc('ORTHOPEDIC SURGERY')}>ORTHOPEDIC SURGERY</DropdownItem>
                            <DropdownItem onClick={() => setDwc('OCCUPATIONAL MEDICINE')}>OCCUPATIONAL MEDICINE</DropdownItem>
                            <DropdownItem onClick={() => setDwc('MENTAL HEALTH')}>MENTAL HEALTH</DropdownItem>
                            <DropdownItem onClick={() => setDwc('ACUPUNCTURE')}>ACUPUNCTURE</DropdownItem>
                            <DropdownItem onClick={() => setDwc('PSYCHOLOGY')}>PSYCHOLOGY</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div>
                    <Dropdown isOpen={codeDropdownOpen} toggle={code_toggle} size="sm" >
                        <DropdownToggle caret style={{width: '80px'}}>
                            {code}
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => setCode('MISC')}>MISC</DropdownItem>
                            <DropdownItem onClick={() => setCode('ANC')}>ANC</DropdownItem>
                            <DropdownItem onClick={() => setCode('OCCM')}>OCCM</DropdownItem>
                            <DropdownItem onClick={() => setCode('LAC')}>LAC</DropdownItem>
                            <DropdownItem onClick={() => setCode('PTP')}>PTP</DropdownItem>
                            <DropdownItem onClick={() => setCode('ORTHO')}>ORTHO</DropdownItem>
                            <DropdownItem onClick={() => setCode('ANC15')}>ANC15</DropdownItem>
                            <DropdownItem onClick={() => setCode('DC')}>DC</DropdownItem>
                            <DropdownItem onClick={() => setCode('PMR')}>PMR</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <div className="google_address" style={{width: "250px"}}>
                    <AddNewAddressInput 
                        setAddress={setAddress} 
                        setCity={setCity} 
                        setState={setState}
                        setCounty={setCounty}
                        setZip={setZip}
                        setLongitude={setLongitude} 
                        setLatitude={setLatitude} 
                    />
                </div>
                <div><Input placeholder="suite" bsSize="sm" value={suite} onChange={(e) => setSuite(e.target.value.toUpperCase())}/></div>
                <div style={{width: "150px"}}><Input placeholder="city" bsSize="sm" value={city} readOnly/></div>
                <div><Input placeholder="state" bsSize="sm" value={state} readOnly/></div>
                <div><Input placeholder="zip" bsSize="sm" value={zip} readOnly /></div> {/* onChange={(e) => setZip(e.target.value.toUpperCase())} /></div> */}
                <div><Input placeholder="phone" bsSize="sm" value={phone} onChange={(e) => setPhone(e.target.value.toUpperCase())}/></div>
                <div><Input placeholder="fax" bsSize="sm" value={fax} onChange={(e) => setFax(e.target.value.toUpperCase())}/></div>
                <div style={{width: "100px"}}><Input placeholder="latitude" bsSize="sm" value={latitude} readOnly/></div>
                <div style={{width: "100px"}}><Input placeholder="longitude" bsSize="sm" value={longitude} readOnly/></div>
                <div><Input placeholder="taxid" bsSize="sm" value={taxid} onChange={(e) => setTaxid(e.target.value.toUpperCase())}/></div>
                <div style={{width: "130px"}}><Input placeholder="statelicensenumber" bsSize="sm" value={statelicensenumber} onChange={(e) => setStatelicensenumber(e.target.value.toUpperCase())}/></div>
                <div><Input placeholder="county" bsSize="sm" value={county.toUpperCase()} readOnly/></div>
                <div><Input placeholder="workinghrs" bsSize="sm" value={workinghrs} onChange={(e) => setWorkinghrs(e.target.value.toUpperCase())}/></div>
                <div><Input placeholder="priority" bsSize="sm" value={priority} onChange={(e) => setPriority(e.target.value.toUpperCase())}/></div>
                <div><Input placeholder="newid" bsSize="sm" value={newid} onChange={(e) => setNewid(e.target.value.toUpperCase())}/></div>
            </div>
            <div className="checkboxArea">
                <div className="mpn_panel">
                    <div className="mpn_title1">referral: </div>
                    <Input className="mpn_body" id="referral" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn3095: </div>
                    <Input className="mpn_body" id="mpn3095" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn3096: </div>
                    <Input className="mpn_body" id="mpn3096" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn3097: </div>
                    <Input className="mpn_body" id="mpn3097" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn0701: </div>
                    <Input className="mpn_body" id="mpn0701" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn2347: </div>
                    <Input className="mpn_body" id="mpn2347" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn2125: </div>
                    <Input className="mpn_body" id="mpn2125" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn2128: </div>
                    <Input className="mpn_body" id="mpn2128" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn2126: </div>
                    <Input className="mpn_body" id="mpn2126" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn2127: </div>
                    <Input className="mpn_body" id="mpn2127" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn2129: </div>
                    <Input className="mpn_body" id="mpn2129" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn2130: </div>
                    <Input className="mpn_body" id="mpn2130" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn2173: </div>
                    <Input className="mpn_body" id="mpn2173" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn2079: </div>
                    <Input className="mpn_body" id="mpn2079" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn1635: </div>
                    <Input className="mpn_body" id="mpn1635" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn1636: </div>
                    <Input className="mpn_body" id="mpn1636" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn1637: </div>
                    <Input className="mpn_body" id="mpn1637" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn2474: </div>
                    <Input className="mpn_body" id="mpn2474" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn2473: </div>
                    <Input className="mpn_body" id="mpn2473" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn0598: </div>
                    <Input className="mpn_body" id="mpn0598" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn2502: </div>
                    <Input className="mpn_body" id="mpn2502" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn2469: </div>
                    <Input className="mpn_body" id="mpn2469" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn2468: </div>
                    <Input className="mpn_body" id="mpn2468" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn2376: </div>
                    <Input className="mpn_body" id="mpn2376" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn2394: </div>
                    <Input className="mpn_body" id="mpn2394" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn1203: </div>
                    <Input className="mpn_body" id="mpn1203" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">mpn3104: </div>
                    <Input className="mpn_body" id="mpn3104" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className="mpn_title1">deleted: </div>
                    <Input className="mpn_body" id="deleted" type="checkbox"/>
                </div>
                {/* <Input placeholder="created" /> */}
                {/* <Input placeholder="deleted_date" />
                <Input placeholder="deleted_by" /> */}
            </div>            
            <Button className="newrow-save" color="info" onClick={() => props.toggle_collapse()}><AiFillUpCircle /></Button>
            <Button className="newrow-save" color="info" onClick={() => saveNewRow()}>Save</Button>
        </div>
    );
	
}

export default AddNewRow;