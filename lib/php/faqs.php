<?php
$faqs = [
    [
        'question' => 'What is the EDGE Security Conference?',
        'answer' => 'The EDGE Security Conference is a national community-wide cybersecurity conference featuring a world-class lineup of experts from the information security industry tasked with providing participants intelligence on new developments and valuable insights.

Cybersecurity is a growing and ever-evolving field and requires that professionals stay up-to-date on the latest best practices to improve their organization’s security posture, but these experts need the support of C-Level and managerial champions to implement innovation.

EDGE2017 brings together these experts in the cybersecurity industry with business leaders from a variety of industries to both identify security challenges and offer solutions to those issues.',
    ],
    [
        'question' => 'How do I register for the EDGE2017 Conference?',
        'answer' => 'Please register online here: <a href="http://www.cvent.com/d/dvqhx5/4W?RefID=Conference+Website">http://www.cvent.com/d/dvqhx5/4W?RefID=Conference+Website</a>',
    ],
    [
        'question' => 'When and where is the EDGE2017 Conference?',
        'answer' => 'EDGE2017 will be held on Oct. 17-18 at the <a href="http://www.kccsmg.com/">Knoxville Convention Center</a>, 701 Henley St., Knoxville, TN 37902.',
    ],
    [
        'question' => 'What hotels are nearby?',
        'answer' => 'You can find a list of recommended hotels by visiting: <a href="https://edgesecurityconference.com/venue/recommended-hotels/">https://edgesecurityconference.com/venue/recommended-hotels/</a>',
    ],
    [
        'question' => 'Where can I find a list of all the speakers?',
        'answer' => 'As we get nearer to the conference date, we will be adding a complete list of
speakers and topics to our agenda, which can be found here: <a href="https://edgesecurityconference.com/agenda/">https://edgesecurityconference.com/agenda/</a>. A final agenda will be online by the first of August. You can also register to receive email updates.',
    ],
    [
        'question' => 'Are there any after-hours events?',
        'answer' => 'Yes. An EDGE2017 After-Hours event is planned and we will add more information about this event to the website as it becomes available.',
    ],
    [
        'question' => 'How do I keep up with all the options EDGE2017 has to offer?',
        'answer' => 'You can sign up to receive emails from the EDGE2017 Conference, by registering here: <a href="https://landing.swordshield.com/edge2017-updates">https://landing.swordshield.com/edge2017-updates</a> or you can visit the <a href="https://www.edgesecurityconference.com">www.edgesecurityconference.com</a> website often.',
    ],
    [
        'question' => 'How can I contact EDGE2017 staff?',
        'answer' => 'If you have questions regarding payment or the event, itself, you may email us at <a href="mailto:edge2017@edgesecurityconference.com">edge2017@edgesecurityconference.com</a>. Speakers may use <a href="mailto:speakers@edgesecurityconference.com">speakers@edgesecurityconference.com</a> and sponsors may use <a href="mailto:sponsors@edgesecurityconference.com">sponsors@edgesecurityconference.com</a>. Media contacts can email Ripley PR at 865-977-1973 or by emailing <a href="hripley@ripleypr.com">hripley@ripleypr.com</a>.',
    ],
    [
        'question' => 'What is the conference attire?',
        'answer' => 'Business casual is most appropriate.',
    ],
    [
        'question' => 'Will you provide a list of conference registrants?',
        'answer' => 'As a rule and to respect the privacy of all EDGE2017 conference attendees, we do not divulge or share registration information. It is our goal to allow our attendees to network with other registrants both at the conference and at after-hour events.',
    ],
];

echo '<ol>';
foreach( $faqs as $key => $faq ){
    echo '<li><a href="#' . $key . '">' . $faq['question'] . '</a></li>';
}
echo '</ol>';

foreach( $faqs as $key => $faq ){
    echo '<a name="' . $key . '"></a><div style="padding-top: 130px;">';
    echo '<h4>' . ($key + 1) . ') ' . $faq['question'] . '</h4>';
    echo apply_filters( 'the_content', $faq['answer'] );
    echo '<p style="text-align: right;"><a href="#">&uarr; Top</a></p>';
    echo '</div>';
}
?>













