from django import forms

TYPE_CHOICES =( 
    ("All", "All"), 
    ("Chuck", "Chuck Norris Factes"), 
    ("OtherJoke", "Other Jokes"), 
) 
  
# creating a form  
class TypeChoiceForm(forms.Form): 
    type_field = forms.ChoiceField(choices = TYPE_CHOICES, label='',) 