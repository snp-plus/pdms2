import React, { useState } from 'react';
import { Input, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Button, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { filterRows, getAllDBData } from '../utils/gridActions';
import { AiFillUpCircle } from 'react-icons/ai';

const FilterPanel = (props) => {
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

    const [referralNode, setReferralNode] = useState(false);
    const [mpn0589Node, setMpn0589Node] = useState(false);
    const [mpn0701Node, setMpn0701Node] = useState(false);
    const [mpn1203Node, setMpn1203Node] = useState(false);
    const [mpn2079Node, setMpn2079Node] = useState(false);
    const [mpn2125Node, setMpn2125Node] = useState(false);
    const [mpn2126Node, setMpn2126Node] = useState(false);
    const [mpn2128Node, setMpn2128Node] = useState(false);
    const [mpn2347Node, setMpn2347Node] = useState(false);
    const [mpn2376Node, setMpn2376Node] = useState(false);
    const [mpn2394Node, setMpn2394Node] = useState(false);
    const [mpn2451Node, setMpn2451Node] = useState(false);
    const [mpn2452Node, setMpn2452Node] = useState(false);
    const [mpn3091Node, setMpn3091Node] = useState(false);
    const [mpn3095Node, setMpn3095Node] = useState(false);
    const [mpn3096Node, setMpn3096Node] = useState(false);
    const [mpn3097Node, setMpn3097Node] = useState(false);
    const [deleteNode, setDeleteNode] = useState(false);

    const filterData = () => {
        const referral = document.getElementById("referral_1").checked;
        const mpn0589 = document.getElementById("mpn0589_1").checked;
        const mpn0701 = document.getElementById("mpn0701_1").checked;
        const mpn1203 = document.getElementById("mpn1203_1").checked;
        const mpn2079 = document.getElementById("mpn2079_1").checked;
        const mpn2125 = document.getElementById("mpn2125_1").checked;
        const mpn2126 = document.getElementById("mpn2126_1").checked;
        const mpn2128 = document.getElementById("mpn2128_1").checked;
        const mpn2347 = document.getElementById("mpn2347_1").checked;
        const mpn2376 = document.getElementById("mpn2376_1").checked;
        const mpn2394 = document.getElementById("mpn2394_1").checked;
        const mpn2451 = document.getElementById("mpn2451_1").checked;
        const mpn2452 = document.getElementById("mpn2452_1").checked;
        const mpn3091 = document.getElementById("mpn3091_1").checked;
        const mpn3095 = document.getElementById("mpn3095_1").checked;
        const mpn3096 = document.getElementById("mpn3096_1").checked;
        const mpn3097 = document.getElementById("mpn3097_1").checked;
        const deleted = document.getElementById("deleted_1").checked;

        const data = [{
                item: 'first',
                seleted: document.getElementById("firstname-flag").checked,
                checkbox: false,
                value: firstname
            },{
                item: 'last',
                seleted: document.getElementById("lastname-flag").checked,
                checkbox: false,
                value: lastname
            },{
                item: 'degree',
                seleted: document.getElementById("degree-flag").checked,
                checkbox: false,
                value: degree
            },{
                item: 'entity',
                seleted: document.getElementById("entity-flag").checked,
                checkbox: false,
                value: entity
            },{
                item: 'specialty',
                seleted: document.getElementById("specialty-flag").checked,
                checkbox: false,
                value: specialty
            },{
                item: 'dwc',
                seleted: document.getElementById("dwc-flag").checked,
                checkbox: false,
                value: dwc
            },{
                item: 'code',
                seleted: document.getElementById("code-flag").checked,
                checkbox: false,
                value: code
            },{
                item: 'address',
                seleted: document.getElementById("address-flag").checked,
                checkbox: false,
                value: address
            },{
                item: 'suite',
                seleted: document.getElementById("suite-flag").checked,
                checkbox: false,
                value: suite
            },{
                item: 'city',
                seleted: document.getElementById("city-flag").checked,
                checkbox: false,
                value: city
            },{
                item: 'state',
                seleted: document.getElementById("state-flag").checked,
                checkbox: false,
                value: state
            },{
                item: 'zip',
                seleted: document.getElementById("zip-flag").checked,
                checkbox: false,
                value: zip
            },{
                item: 'phone',
                seleted: document.getElementById("phone-flag").checked,
                checkbox: false,
                value: phone
            },{
                item: 'fax',
                seleted: document.getElementById("fax-flag").checked,
                checkbox: false,
                value: fax
            },{
                item: 'latitude',
                seleted: document.getElementById("latitude-flag").checked,
                checkbox: false,
                value: latitude
            },{
                item: 'longitude',
                seleted: document.getElementById("longitude-flag").checked,
                checkbox: false,
                value: longitude
            },{
                item: 'taxid',
                seleted: document.getElementById("taxid-flag").checked,
                checkbox: false,
                value: taxid
            },{
                item: 'statelicensenumber',
                seleted: document.getElementById("statelicensenumber-flag").checked,
                checkbox: false,
                value: statelicensenumber
            },{
                item: 'county',
                seleted: document.getElementById("county-flag").checked,
                checkbox: false,
                value: county
            },{
                item: 'workinghrs',
                seleted: document.getElementById("workinghrs-flag").checked,
                checkbox: false,
                value: workinghrs
            },{
                item: 'priority',
                seleted: document.getElementById("priority-flag").checked,
                checkbox: false,
                value: priority
            },{
                item: 'referral',
                seleted: referralNode,
                checkbox: true,
                value: referral
            },{
                item: 'mpn0589',
                seleted: mpn0589Node,
                checkbox: true,
                value: mpn0589
            },{
                item: 'mpn0701',
                seleted: mpn0701Node,
                checkbox: true,
                value: mpn0701
            },{
                item: 'mpn1203',
                seleted: mpn1203Node,
                checkbox: true,
                value: mpn1203
            },{
                item: 'mpn2079',
                seleted: mpn2079Node,
                checkbox: true,
                value: mpn2079
            },{
                item: 'mpn2125',
                seleted: mpn2125Node,
                checkbox: true,
                value: mpn2125
            },{
                item: 'mpn2126',
                seleted: mpn2126Node,
                checkbox: true,
                value: mpn2126
            },{
                item: 'mpn2128',
                seleted: mpn2128Node,
                checkbox: true,
                value: mpn2128
            },{
                item: 'mpn2347',
                seleted: mpn2347Node,
                checkbox: true,
                value: mpn2347
            },{
                item: 'mpn2376',
                seleted: mpn2376Node,
                checkbox: true,
                value: mpn2376
            },{
                item: 'mpn2394',
                seleted: mpn2394Node,
                checkbox: true,
                value: mpn2394
            },{
                item: 'mpn2451',
                seleted: mpn2451Node,
                checkbox: true,
                value: mpn2451
            },{
                item: 'mpn2452',
                seleted: mpn2452Node,
                checkbox: true,
                value: mpn2452
            },{
                item: 'mpn3091',
                seleted: mpn3091Node,
                checkbox: true,
                value: mpn3091
            },{
                item: 'mpn3095',
                seleted: mpn3095Node,
                checkbox: true,
                value: mpn3095
            },{
                item: 'mpn3096',
                seleted: mpn3096Node,
                checkbox: true,
                value: mpn3096
            },{
                item: 'mpn3097',
                seleted: mpn3097Node,
                checkbox: true,
                value: mpn3097
            },{
                item: 'deleted',
                seleted: deleteNode,
                checkbox: true,
                value: deleted
            }
        ];

        const filter_data = [];
        data.map((value) => {
            if(value.seleted) filter_data.push(value);
        });
        filterRows(props.gridApi, filter_data);
        return 0;
    }

    const clearFilter = () => {
        setReferralNode(false);
        setMpn0589Node(false);
        setMpn0701Node(false);
        setMpn1203Node(false);
        setMpn2079Node(false);
        setMpn2125Node(false);
        setMpn2126Node(false);
        setMpn2128Node(false);
        setMpn2347Node(false);
        setMpn2376Node(false);
        setMpn2394Node(false);
        setMpn2451Node(false);
        setMpn2452Node(false);
        setMpn3091Node(false);
        setMpn3095Node(false);
        setMpn3096Node(false);
        setMpn3097Node(false);
        setDeleteNode(false);
        document.getElementById("referral_1").checked = false;
        document.getElementById("mpn0589_1").checked = false;
        document.getElementById("mpn0701_1").checked = false;
        document.getElementById("mpn1203_1").checked = false;
        document.getElementById("mpn2079_1").checked = false;
        document.getElementById("mpn2125_1").checked = false;
        document.getElementById("mpn2126_1").checked = false;
        document.getElementById("mpn2128_1").checked = false;
        document.getElementById("mpn2347_1").checked = false;
        document.getElementById("mpn2376_1").checked = false;
        document.getElementById("mpn2394_1").checked = false;
        document.getElementById("mpn2451_1").checked = false;
        document.getElementById("mpn2452_1").checked = false;
        document.getElementById("mpn3091_1").checked = false;
        document.getElementById("mpn3095_1").checked = false;
        document.getElementById("mpn3096_1").checked = false;
        document.getElementById("mpn3097_1").checked = false;
        document.getElementById("deleted_1").checked = false;

        document.getElementById("firstname-flag").checked = false;
        document.getElementById("lastname-flag").checked = false;
        document.getElementById("degree-flag").checked = false;
        document.getElementById("entity-flag").checked = false;
        document.getElementById("specialty-flag").checked = false;
        document.getElementById("dwc-flag").checked = false;
        document.getElementById("code-flag").checked = false;
        document.getElementById("address-flag").checked = false;
        document.getElementById("suite-flag").checked = false;
        document.getElementById("city-flag").checked = false;
        document.getElementById("state-flag").checked = false;
        document.getElementById("zip-flag").checked = false;
        document.getElementById("phone-flag").checked = false;
        document.getElementById("fax-flag").checked = false;
        document.getElementById("latitude-flag").checked = false;
        document.getElementById("longitude-flag").checked = false;
        document.getElementById("taxid-flag").checked = false;
        document.getElementById("statelicensenumber-flag").checked = false;
        document.getElementById("county-flag").checked = false;
        document.getElementById("workinghrs-flag").checked = false;
        document.getElementById("priority-flag").checked = false;

        getAllDBData(props.gridApi);
    }

    return (
        <div className="newRowArea">
            <div className="inputArea">
                <div>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="firstname-flag" aria-label="check if this is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="firstname" bsSize="sm" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="lastname-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="lastname" bsSize="sm" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="degree-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
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
                    </InputGroup>                    
                </div>
                <div>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="entity-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
                    <Input placeholder="entity" bsSize="sm" value={entity} onChange={(e) => setEntity(e.target.value)} />
                    </InputGroup>
                </div>
                <div style={{width: '270px'}}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="specialty-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
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
                    </InputGroup>                    
                </div>
                <div style={{width: '270px'}}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="dwc-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
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
                    </InputGroup>
                </div>
                <div>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="code-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
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
                    </InputGroup>
                </div>
                <div  style={{width: "270px"}}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="address-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
                    <Input placeholder="address" bsSize="sm" value={address} onChange={(e) => setAddress(e.target.value)} />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="suite-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
                    <Input placeholder="suite" bsSize="sm" value={suite} onChange={(e) => setSuite(e.target.value)} />
                    </InputGroup>
                </div>
                <div  style={{width: "170px"}}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="city-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
                    <Input placeholder="city" bsSize="sm" value={city} onChange={(e) => setCity(e.target.value)} />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="state-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
                    <Input placeholder="state" bsSize="sm" value={state} onChange={(e) => setState(e.target.value)} />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="zip-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
                    <Input placeholder="zip" bsSize="sm" value={zip} onChange={(e) => setZip(e.target.value)} />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="phone-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
                    <Input placeholder="phone" bsSize="sm" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="fax-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
                    <Input placeholder="fax" bsSize="sm" value={fax} onChange={(e) => setFax(e.target.value)} />
                    </InputGroup>
                </div>
                <div  style={{width: "120px"}}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="latitude-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
                    <Input placeholder="latitude" bsSize="sm" value={latitude} onChange={(e) => setLatitude(e.target.value)} />
                    </InputGroup>
                </div>
                <div  style={{width: "120px"}}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="longitude-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
                    <Input placeholder="longitude" bsSize="sm" value={longitude} onChange={(e) => setLongitude(e.target.value)} />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="taxid-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
                    <Input placeholder="taxid" bsSize="sm" value={taxid} onChange={(e) => setTaxid(e.target.value)} />
                    </InputGroup>
                </div>
                <div style={{width: "150px"}}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="statelicensenumber-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
                    <Input placeholder="statelicensenumber" bsSize="sm" value={statelicensenumber} onChange={(e) => setStatelicensenumber(e.target.value)} />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="county-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
                    <Input placeholder="county" bsSize="sm" value={county} onChange={(e) => setCounty(e.target.value)} />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="workinghrs-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
                    <Input placeholder="workinghrs" bsSize="sm" value={workinghrs} onChange={(e) => setWorkinghrs(e.target.value)} />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="priority-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
                    <Input placeholder="priority" bsSize="sm" value={priority} onChange={(e) => setPriority(e.target.value)} />
                    </InputGroup>
                </div>
                <div>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <Input addon type="checkbox" id="newid-flag" aria-label="check this it is filter item" />
                            </InputGroupText>
                        </InputGroupAddon>
                    <Input placeholder="newid" bsSize="sm" value={newid} onChange={(e) => setNewid(e.target.value)} />
                    </InputGroup>
                </div>
            </div>

            <div className="checkboxArea">
                <div className="mpn_panel">
                    <div className={referralNode ? "mpn_title" : "mpn_title_false"} onClick={() => setReferralNode(!referralNode)}>referral: </div>
                    <Input className="mpn_body" id="referral_1" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className={mpn0589Node ? "mpn_title" : "mpn_title_false"} onClick={() => setMpn0589Node(!mpn0589Node)}>mpn0589: </div>
                    <Input className="mpn_body" id="mpn0589_1" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className={mpn0701Node ? "mpn_title" : "mpn_title_false"} onClick={() => setMpn0701Node(!mpn0701Node)}>mpn0701: </div>
                    <Input className="mpn_body" id="mpn0701_1" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className={mpn1203Node ? "mpn_title" : "mpn_title_false"} onClick={() => setMpn1203Node(!mpn1203Node)}>mpn1203: </div>
                    <Input className="mpn_body" id="mpn1203_1" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className={mpn2079Node ? "mpn_title" : "mpn_title_false"} onClick={() => setMpn2079Node(!mpn2079Node)}>mpn2079: </div>
                    <Input className="mpn_body" id="mpn2079_1" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className={mpn2125Node ? "mpn_title" : "mpn_title_false"} onClick={() => setMpn2125Node(!mpn2125Node)}>mpn2125: </div>
                    <Input className="mpn_body" id="mpn2125_1" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className={mpn2126Node ? "mpn_title" : "mpn_title_false"} onClick={() => setMpn2126Node(!mpn2126Node)}>mpn2126: </div>
                    <Input className="mpn_body" id="mpn2126_1" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className={mpn2128Node ? "mpn_title" : "mpn_title_false"} onClick={() => setMpn2128Node(!mpn2128Node)}>mpn2128: </div>
                    <Input className="mpn_body" id="mpn2128_1" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className={mpn2347Node ? "mpn_title" : "mpn_title_false"} onClick={() => setMpn2347Node(!mpn2347Node)}>mpn2347: </div>
                    <Input className="mpn_body" id="mpn2347_1" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className={mpn2376Node ? "mpn_title" : "mpn_title_false"} onClick={() => setMpn2376Node(!mpn2376Node)}>mpn2376: </div>
                    <Input className="mpn_body" id="mpn2376_1" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className={mpn2394Node ? "mpn_title" : "mpn_title_false"} onClick={() => setMpn2394Node(!mpn2394Node)}>mpn2394: </div>
                    <Input className="mpn_body" id="mpn2394_1" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className={mpn2451Node ? "mpn_title" : "mpn_title_false"} onClick={() => setMpn2451Node(!mpn2451Node)}>mpn2451: </div>
                    <Input className="mpn_body" id="mpn2451_1" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className={mpn2452Node ? "mpn_title" : "mpn_title_false"} onClick={() => setMpn2452Node(!mpn2452Node)}>mpn2452: </div>
                    <Input className="mpn_body" id="mpn2452_1" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className={mpn3091Node ? "mpn_title" : "mpn_title_false"} onClick={() => setMpn3091Node(!mpn3091Node)}>mpn3091: </div>
                    <Input className="mpn_body" id="mpn3091_1" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className={mpn3095Node ? "mpn_title" : "mpn_title_false"} onClick={() => setMpn3095Node(!mpn3095Node)}>mpn3095: </div>
                    <Input className="mpn_body" id="mpn3095_1" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className={mpn3096Node ? "mpn_title" : "mpn_title_false"} onClick={() => setMpn3096Node(!mpn3096Node)}>mpn3096: </div>
                    <Input className="mpn_body" id="mpn3096_1" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className={mpn3097Node ? "mpn_title" : "mpn_title_false"} onClick={() => setMpn3097Node(!mpn3097Node)}>mpn3097: </div>
                    <Input className="mpn_body" id="mpn3097_1" type="checkbox"/>
                </div>
                <div className="mpn_panel">
                    <div className={deleteNode ? "mpn_title" : "mpn_title_false"} onClick={() => setDeleteNode(!deleteNode)}>deleted: </div>
                    <Input className="mpn_body" id="deleted_1" type="checkbox"/>
                </div>
                {/* <Input placeholder="created" /> */}
                {/* <Input placeholder="deleted_date" />
                <Input placeholder="deleted_by" /> */}
            </div>
            <Button className="newrow-save" color="info" onClick={() => props.onFilterToggle()}><AiFillUpCircle /></Button>
            <Button className="newrow-save" color="info" onClick={() => clearFilter()}>Clear</Button>
            <Button className="newrow-save" color="info" onClick={() => filterData()}>Filter</Button>
        </div>
    );
	
}

export default FilterPanel;